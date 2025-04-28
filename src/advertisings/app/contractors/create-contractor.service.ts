import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import {
  CONTRACTOR_REPOSITORY,
  COMPANY_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  type IContractorRepository,
  type ICompanyRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { IContractor, IMediaAsset } from '@common/domain/entities'
import type { CreateContractorDto } from '@advertisings/domain/dto/contractors/CreateContractor.dto'
import type { ICreateContractorService } from '@advertisings/domain/services/contractors/ICreateContractorService'

@Injectable()
export class CreateContractorService implements ICreateContractorService {
  logger = new Logger(CreateContractorService.name)

  constructor(
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(data: CreateContractorDto): Promise<IContractor> {
    const { companyId, mediaAsset, ...contractorData } = data

    if (companyId) {
      const company = await this.companyRepository.findById(companyId)
      if (!company) {
        throw new BadRequestException('La compañía especificada no existe')
      }
    }

    const contractorTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let newContractor: IContractor | null = null
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
            this.logger.error('Error al crear el logo', error)
            throw new BadRequestException('Error al crear el logo')
          }
        }

        try {
          newContractor = await this.contractorRepository.create(
            {
              ...contractorData,
              companyId,
              ...(newMedia && { logoId: newMedia.id }),
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al crear el contratista')
        }

        return newContractor
      })

    return await this.contractorRepository.findById(contractorTransaction.id)
  }
}
