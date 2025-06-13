import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  CONTRACTOR_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  type IContractorRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import type { IDeleteContractorService } from '@advertisings/domain/services/contractors/IDeleteContractorService'

@Injectable()
export class DeleteContractorService implements IDeleteContractorService {
  logger = new Logger(DeleteContractorService.name)

  constructor(
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const contractor = await this.contractorRepository.findById(id)
    if (!contractor) {
      throw new NotFoundException('El contratista no existe')
    }

    const isDeleted = await this.transactionService.executeTransaction(
      async (manager) => {
        let deletedContractor: boolean = false
        if (contractor?.logoId) {
          try {
            const image = await this.mediaRepository.findById(
              contractor.logoId,
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
                await this.mediaRepository.softDelete(
                  contractor.logoId,
                  manager,
                )
              }
            }
          } catch (error) {
            this.logger.error(
              `Error al eliminar la imagen del contratista: ${error}`,
            )
          }
        }

        try {
          deletedContractor = await this.contractorRepository.softDelete(
            id,
            manager,
          )
        } catch (error) {
          this.logger.error(`Error al eliminar el contratista: ${error}`)
          throw new NotFoundException('Error al eliminar el contratista')
        }
        return deletedContractor
      },
    )

    return { success: isDeleted }
  }
}
