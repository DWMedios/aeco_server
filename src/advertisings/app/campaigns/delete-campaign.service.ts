import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  CAMPAIGN_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  type ICampaignRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import type { IDeleteCampaignService } from '@advertisings/domain/services/campaigns/IDeleteCampaignService'

@Injectable()
export class DeleteCampaignService implements IDeleteCampaignService {
  logger = new Logger(DeleteCampaignService.name)

  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const campaign = await this.campaignRepository.findById(id)
    if (!campaign) {
      throw new NotFoundException('La campaña no existe')
    }

    const isDeleted = await this.transactionService.executeTransaction(
      async (manager) => {
        let deletedCampaign: boolean = false
        if (campaign?.mediaId) {
          try {
            const media = await this.mediaRepository.findById(
              campaign.mediaId,
              manager,
            )
            if (media) {
              const s3Key = `dw/${decodeURIComponent(media.fileKey)}`
              const fileExists = await this.s3Service.fileExist(s3Key)
              let fileDeleted = false
              if (fileExists) {
                fileDeleted = await this.s3Service.deleteFile(s3Key)
              }
              if (fileDeleted) {
                await this.mediaRepository.softDelete(campaign.mediaId, manager)
              }
            }
          } catch (error) {
            this.logger.error(
              `Error al eliminar la imagen de la campaña: ${error}`,
            )
          }
        }

        try {
          deletedCampaign = await this.campaignRepository.softDelete(
            id,
            manager,
          )
        } catch (error) {
          this.logger.error(`Error al eliminar la campaña: ${error}`)
          throw new NotFoundException('Error al eliminar la campaña')
        }
        return deletedCampaign
      },
    )

    return { success: isDeleted }
  }
}
