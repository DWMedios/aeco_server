import { Injectable, Inject, BadRequestException, Logger } from '@nestjs/common'
import {
  AECO_REPOSITORY,
  COMPANY_REPOSITORY,
  REWARD_REPOSITORY,
  type IAecoRepository,
  type ICompanyRepository,
  type IRewardRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { CreateRewardDto } from '@rewards/domain/dto/CreateReward.dto'
import type { IAeco, IReward } from '@common/domain/entities'
import type { ICreateRewardService } from '@rewards/domain/services/ICreateRewardService'

@Injectable()
export class CreateRewardService implements ICreateRewardService {
  logger = new Logger(CreateRewardService.name)

  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(request: CreateRewardDto): Promise<IReward> {
    const { aecos, ...newReward } = request

    const companyExists = await this.companyRepository.exists({
      id: newReward.companyId,
    })

    if (!companyExists) {
      throw new BadRequestException('La empresa no existe')
    }

    let aecoExists: IAeco[] = []
    if (aecos?.length > 0) {
      aecoExists = await this.aecoRepository.findManyByIds({
        ids: aecos,
        companyId: newReward.companyId,
      })

      if (aecoExists.length !== aecos.length) {
        throw new BadRequestException('Algunos aecos no existen')
      }
    }

    const rewardTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let reward: IReward | null = null
        try {
          reward = await this.rewardRepository.create(
            {
              ...newReward,
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
