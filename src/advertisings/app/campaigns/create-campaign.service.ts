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
  COMPANY_REPOSITORY,
  CONTRACTOR_REPOSITORY,
  ICompanyRepository,
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
import type { IAeco, ICampaign, IMediaAsset } from '@common/domain/entities'
import type { CreateCampaignDto } from '@advertisings/domain/dto/campaigns/CreateCampaign.dto'
import type { ICreateCampaignService } from '@advertisings/domain/services/campaigns/ICreateCampaignService'

@Injectable()
export class CreateCampaignService implements ICreateCampaignService {
  logger = new Logger(CreateCampaignService.name)

  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(data: CreateCampaignDto): Promise<ICampaign> {
    const { contractorId, companyId, mediaAsset, aecos, ...campaignData } = data

    const company = await this.companyRepository.findById(companyId)
    if (!company) {
      throw new NotFoundException('La empresa especificada no existe')
    }

    if (contractorId) {
      const contractor = await this.contractorRepository.findByIdAndCompany(
        contractorId,
        company.id,
      )
      if (!contractor) {
        throw new NotFoundException('El contratista especificado no existe')
      }
    }

    let aecosExists: IAeco[] = []
    if (aecos?.length > 0) {
      aecosExists = await this.aecoRepository.findManyByIds({
        ids: aecos,
        companyId: company.id,
      })
      if (aecosExists.length !== aecos.length) {
        throw new BadRequestException('Algunos aecos no existen')
      }
    }

    const campaignTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let newCampaign: ICampaign | null = null
        let newMedia: IMediaAsset | null = null

        if (mediaAsset) {
          try {
            newMedia = await this.mediaRepository.create(
              {
                fileKey: mediaAsset.fileKey,
                originalName: mediaAsset.originalName,
                mimeType: mediaAsset.mimeType,
                assetType: mediaAsset.assetType,
                ...(mediaAsset?.fileSize && { fileSize: mediaAsset.fileSize }),
              },
              manager,
            )
          } catch (error) {
            this.logger.error('Error al crear el media asset', error)
            throw new BadRequestException('Error al crear el media asset')
          }
        }

        try {
          newCampaign = await this.campaignRepository.create(
            {
              ...campaignData,
              companyId: company.id,
              ...(contractorId && { contractorId }),
              ...(newMedia && { mediaId: newMedia.id }),
              ...(aecosExists?.length > 0 && { aecos: aecosExists }),
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al crear la campaña')
        }

        return newCampaign
      })

    return await this.campaignRepository.findById(campaignTransaction.id)
  }
}
