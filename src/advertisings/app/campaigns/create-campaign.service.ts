import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import {
  CAMPAIGN_REPOSITORY,
  CONTRACTOR_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  type ICampaignRepository,
  type IContractorRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { ICampaign, IMediaAsset } from '@common/domain/entities'
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
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(data: CreateCampaignDto): Promise<ICampaign> {
    const { contractorId, mediaAsset, ...campaignData } = data

    if (contractorId) {
      const contractor = await this.contractorRepository.findById(contractorId)
      if (!contractor) {
        throw new NotFoundException('El contratista especificado no existe')
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
              ...(contractorId && { contractorId }),
              ...(newMedia && { mediaId: newMedia.id }),
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
