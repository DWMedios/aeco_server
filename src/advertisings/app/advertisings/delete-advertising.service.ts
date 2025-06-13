import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  ADVERTISING_REPOSITORY,
  type IAdvertisingRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { IDeleteAdvertisingService } from '@advertisings/domain/services/advertisings/IDeleteAdvertisingService'

@Injectable()
export class DeleteAdvertisingService implements IDeleteAdvertisingService {
  logger = new Logger(DeleteAdvertisingService.name)

  constructor(
    @Inject(ADVERTISING_REPOSITORY)
    private readonly advertisingRepository: IAdvertisingRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const advertising = await this.advertisingRepository.findById(id)
    if (!advertising) {
      throw new NotFoundException('El anuncio no existe')
    }

    const isDeleted = await this.transactionService.executeTransaction(
      async (manager) => {
        let deletedAdvertising: boolean = false

        try {
          deletedAdvertising = await this.advertisingRepository.softDelete(
            id,
            manager,
          )
        } catch (error) {
          this.logger.error(`Error al eliminar el anuncio: ${error}`)
          throw new NotFoundException('Error al eliminar el anuncio')
        }
        return deletedAdvertising
      },
    )

    return { success: isDeleted }
  }
}
