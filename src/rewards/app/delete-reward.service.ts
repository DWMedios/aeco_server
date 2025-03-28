import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import {
  REWARD_REPOSITORY,
  type IRewardRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { IDeleteRewardService } from '@rewards/domain/services/IDeleteRewardService'

@Injectable()
export class DeleteRewardService implements IDeleteRewardService {
  logger = new Logger(DeleteRewardService.name)

  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const reward = await this.rewardRepository.findById(id)

    if (!reward) throw new NotFoundException('La recompensa no existe')

    const isDeleted = await this.transactionService.executeTransaction(
      async (manager) => {
        let deletedReward: boolean = false
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
