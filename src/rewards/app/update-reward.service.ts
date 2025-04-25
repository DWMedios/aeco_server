import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import {
  AECO_REPOSITORY,
  REWARD_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  type IAecoRepository,
  type IRewardRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { IAeco, IReward } from '@common/domain/entities'
import type { UpdateRewardDto } from '@rewards/domain/dto/UpdateReward.dto'
import type { IUpdateRewardService } from '@rewards/domain/services/IUpdateRewardService'

@Injectable()
export class UpdateRewardService implements IUpdateRewardService {
  logger = new Logger(UpdateRewardService.name)

  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(rewardId: number, request: UpdateRewardDto): Promise<IReward> {
    const { aecos, mediaAsset, ...reqReward } = request

    const foundedReward = await this.rewardRepository.findById(rewardId)

    if (!foundedReward) throw new NotFoundException('La recompensa no existe')

    let aecosExists: IAeco[] = []
    if (aecos?.length > 0) {
      aecosExists = await this.aecoRepository.findManyByIds({
        ids: aecos,
        companyId: foundedReward.companyId,
      })

      if (aecosExists.length !== aecos.length) {
        throw new BadRequestException('Algunos aecos no existen')
      }
    }

    const rewardTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let reward: IReward | null = null
        try {
          if (aecos && aecos.length === 0) {
            foundedReward.aecos = []
          } else {
            foundedReward.aecos = aecosExists
          }

          reward = await this.rewardRepository.updatePartial(
            foundedReward,
            {
              ...reqReward,
              metadata: {
                ...foundedReward.metadata,
                ...(reqReward?.metadata && { ...reqReward.metadata }),
              },
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al actualizar la recompensa')
        }

        if (mediaAsset && foundedReward?.imageId) {
          try {
            await this.mediaRepository.updateById(
              foundedReward.imageId,
              mediaAsset,
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException(
              'Error al actualizar la imagen de la recompensa',
            )
          }
        } else if (mediaAsset && reward?.id) {
          try {
            const mediaAssetCreated = await this.mediaRepository.create(
              mediaAsset,
              manager,
            )

            await this.rewardRepository.updateById(
              reward.id,
              {
                imageId: mediaAssetCreated.id,
              },
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException(
              'Error al crear la imagen de la recompensa',
            )
          }
        }

        return reward ?? foundedReward
      },
    )

    return await this.rewardRepository.findById(rewardTransaction.id)
  }
}
