import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
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
import type { IContractor } from '@common/domain/entities'
import type { UpdateContractorDto } from '@advertisings/domain/dto/contractors/UpdateContractor.dto'
import type { IUpdateContractorService } from '@advertisings/domain/services/contractors/IUpdateContractorService'

@Injectable()
export class UpdateContractorService implements IUpdateContractorService {
  logger = new Logger(UpdateContractorService.name)

  constructor(
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaAssetRepository: IMediaAssetRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(id: number, data: UpdateContractorDto): Promise<IContractor> {
    const { mediaAsset, ...contractorData } = data

    const contractor = await this.contractorRepository.findById(id)
    if (!contractor) {
      throw new NotFoundException('El contratista no existe')
    }

    const contractorTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let contractorToUpdate: IContractor | null = null

        try {
          contractorToUpdate = await this.contractorRepository.updatePartial(
            contractor,
            contractorData,
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al actualizar el contratista')
        }

        if (mediaAsset && contractor?.logoId) {
          try {
            await this.mediaAssetRepository.updateById(
              contractor.logoId,
              mediaAsset,
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Error al actualizar el recurso')
          }
        } else if (mediaAsset && !contractor?.logoId) {
          try {
            const mediaAssetCreated = await this.mediaAssetRepository.create(
              mediaAsset,
              manager,
            )

            contractorToUpdate = await this.contractorRepository.updatePartial(
              contractorToUpdate,
              { logoId: mediaAssetCreated.id },
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Error al crear el recurso')
          }
        }
        return contractorToUpdate ?? contractor
      })

    return await this.contractorRepository.findById(contractorTransaction.id)
  }
}
