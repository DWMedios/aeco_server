import { DateTime } from 'luxon'
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import {
  AECO_REPOSITORY,
  CAMPAIGN_REPOSITORY,
  CONTRACTOR_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  type IAecoRepository,
  type ICampaignRepository,
  type IContractorRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { IAeco, ICampaign } from '@common/domain/entities'
import type { UpdateCampaignDto } from '@advertisings/domain/dto/campaigns/UpdateCampaign.dto'
import type { IUpdateCampaignService } from '@advertisings/domain/services/campaigns/IUpdateCampaignService'

@Injectable()
export class UpdateCampaignService implements IUpdateCampaignService {
  logger = new Logger(UpdateCampaignService.name)

  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaAssetRepository: IMediaAssetRepository,
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(id: number, data: UpdateCampaignDto): Promise<ICampaign> {
    const { contractorId, mediaAsset, aecos, ...campaignData } = data

    const campaign = await this.campaignRepository.findById(id)
    if (!campaign) {
      throw new NotFoundException('La campaña no existe')
    }

    const campaignStart = DateTime.fromISO(campaign.startDate.toString())
    const campaignEnd = DateTime.fromISO(campaign.endDate.toString())

    if (campaignData?.startDate && !campaignData?.endDate) {
      const startDate = DateTime.fromISO(campaignData.startDate.toString())
      if (!startDate.isValid) {
        throw new BadRequestException('La fecha de inicio no es válida')
      }

      if (startDate > campaignEnd) {
        throw new BadRequestException(
          'La fecha de inicio no puede ser menor a la fecha de fin',
        )
      }
    }

    if (campaignData?.endDate && !campaignData?.startDate) {
      const endDate = DateTime.fromISO(campaignData.endDate.toString())
      if (!endDate.isValid) {
        throw new BadRequestException('La fecha de fin no es válida')
      }

      if (endDate < campaignStart) {
        throw new BadRequestException(
          'La fecha de fin no puede ser menor a la fecha de inicio',
        )
      }
    }

    if (campaignData?.startDate && campaignData?.endDate) {
      const startDate = DateTime.fromISO(campaignData.startDate.toString())
      const endDate = DateTime.fromISO(campaignData.endDate.toString())

      if (!startDate.isValid || !endDate.isValid) {
        throw new BadRequestException('Alguna de las fechas no es válida')
      }

      if (startDate > endDate) {
        throw new BadRequestException(
          'La fecha de inicio no puede ser mayor a la fecha de fin',
        )
      }
    }

    if (contractorId) {
      const contractor = await this.contractorRepository.findByIdAndCompany(
        contractorId,
        campaign.companyId,
      )
      if (!contractor) {
        throw new NotFoundException('El contratista especificado no existe')
      }
    }

    let aecosExists: IAeco[] = []
    if (aecos?.length > 0) {
      aecosExists = await this.aecoRepository.findManyByIds({
        ids: aecos,
        companyId: campaign.companyId,
      })

      if (aecosExists.length !== aecos.length) {
        throw new BadRequestException('Algunos aecos no existen')
      }
    }

    const campaignTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let campaignToUpdate: ICampaign | null = null

        try {
          campaignToUpdate = await this.campaignRepository.partialUpdate(
            campaign,
            {
              ...campaignData,
              ...(campaignData.startDate && {
                startDate: DateTime.fromISO(campaignData.startDate.toString())
                  .startOf('day')
                  .toJSDate(),
              }),
              ...(campaignData.endDate && {
                endDate: DateTime.fromISO(campaignData.endDate.toString())
                  .startOf('day')
                  .toJSDate(),
              }),
              ...(aecos.length > 0 && { aecos: aecosExists }),
              ...(contractorId !== undefined && { contractorId }),
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al actualizar la campaña')
        }

        if (mediaAsset && campaign?.mediaId) {
          try {
            await this.mediaAssetRepository.updateById(
              campaign.mediaId,
              mediaAsset,
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Error al actualizar el media asset')
          }
        } else if (mediaAsset && !campaign?.mediaId) {
          try {
            const mediaAssetCreated = await this.mediaAssetRepository.create(
              mediaAsset,
              manager,
            )

            campaignToUpdate = await this.campaignRepository.partialUpdate(
              campaignToUpdate,
              { mediaId: mediaAssetCreated.id },
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Error al crear el media asset')
          }
        }

        return campaignToUpdate ?? campaign
      })

    return await this.campaignRepository.findById(campaignTransaction.id)
  }
}
