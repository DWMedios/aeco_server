import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import {
  MEDIA_ASSET_REPOSITORY,
  REWARD_REPOSITORY,
  type IRewardRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { type IS3Service, S3_SERVICE } from '@shared/domain/services/IS3Service'
import type { IDeleteRewardService } from '@rewards/domain/services/IDeleteRewardService'

@Injectable()
export class DeleteRewardService implements IDeleteRewardService {
  logger = new Logger(DeleteRewardService.name)

  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const reward = await this.rewardRepository.findById(id)

    if (!reward) throw new NotFoundException('La recompensa no existe')

    const isDeleted = await this.transactionService.executeTransaction(
      async (manager) => {
        let deletedReward: boolean = false

        if (reward?.imageId) {
          try {
            const image = await this.mediaRepository.findById(
              reward.imageId,
              manager,
            )
            if (image) {
              const s3Key = `dw/${decodeURIComponent(image.fileKey)}`
              const fileExists = await this.s3Service.fileExist(s3Key)
              let fileDeleted = false
              if (fileExists) {
                fileDeleted = await this.s3Service.deleteFile(s3Key)
              }
              if (fileDeleted) {
                await this.mediaRepository.softDelete(reward.imageId, manager)
              }
            }
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Error al eliminar la imagen')
          }
        }

        try {
          deletedReward = await this.rewardRepository.softDelete(id, manager)
        } catch (error) {
          throw new BadRequestException('Error al eliminar la recompensa')
        }
        return deletedReward
      },
    )

    return { success: isDeleted }
  }
}
