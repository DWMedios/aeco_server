import {
  Injectable,
  Inject,
  BadRequestException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import {
  AECO_REPOSITORY,
  REWARD_REPOSITORY,
  type IAecoRepository,
  type IRewardRepository,
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
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(rewardId: number, request: UpdateRewardDto): Promise<IReward> {
    const { aecos, ...rewardToUpdate } = request

    const findReward = await this.rewardRepository.findById(rewardId)

    if (!findReward) throw new NotFoundException('La recompensa no existe')

    let aecoExists: IAeco[] = []
    if (aecos?.length > 0) {
      aecoExists = await this.aecoRepository.findManyByIds(aecos)
      if (aecoExists.length !== aecos.length) {
        throw new BadRequestException('Algunos aecos no existen')
      }
    }

    const rewardTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let reward: IReward | null = null
        try {
          reward = await this.rewardRepository.update(
            rewardId,
            {
              ...rewardToUpdate,
              metadata: {
                ...findReward.metadata,
                ...(rewardToUpdate?.metadata && rewardToUpdate.metadata),
              },
              ...(aecoExists?.length > 0 && { aecos: aecoExists }),
            },
            manager,
          )
        } catch (error) {
          throw new BadRequestException('Error al crear la recompensa')
        }
        return reward
      },
    )

    return await this.rewardRepository.findById(rewardTransaction.id)
  }
}
