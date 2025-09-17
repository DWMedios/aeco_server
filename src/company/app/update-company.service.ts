import {
  Injectable,
  Inject,
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  AECO_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  type ICompanyRepository,
  type IAecoRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { IAeco, ICompany } from '@common/domain/entities'
import type { UpdateCompanyDto } from '@company/domain/dto/UpdateCompany.dto'
import type { IUpdateCompanyService } from '@company/domain/services/IUpdateCompanyService'

@Injectable()
export class UpdateCompanyService implements IUpdateCompanyService {
  logger = new Logger(UpdateCompanyService.name)

  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(companyId: number, request: UpdateCompanyDto): Promise<ICompany> {
    const { legalRepresentative, mediaAsset, aecos, ...reqCompany } = request

    const company = await this.companyRepository.findById(companyId)

    if (!company) throw new BadRequestException('La empresa no existe')

    if (reqCompany.name) {
      const existsName = await this.companyRepository.exists({
        name: reqCompany.name,
      })

      if (existsName) throw new BadRequestException('La empresa ya existe')
    }

    let aecosExists: IAeco[] = []
    if (aecos?.length > 0) {
      aecosExists = await this.aecoRepository.findManyByIds({
        ids: aecos,
        companyId: company.id,
      })

      if (aecosExists.length !== aecos.length) {
        throw new BadRequestException('Algunos aecos no existen')
      }
    }

    const companyTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let companyToUpdate: ICompany | null = null
        try {
          if (aecos && aecos.length === 0) {
            company.aecos = []
          } else {
            company.aecos = aecosExists
          }

          companyToUpdate = await this.companyRepository.partialUpdate(
            company,
            {
              ...reqCompany,
              metadata: {
                ...company.metadata,
                ...(reqCompany.metadata && { ...reqCompany.metadata }),
              },
              legalRepresentative: {
                ...company.legalRepresentative,
                ...(legalRepresentative && { ...legalRepresentative }),
              },
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException(
            'Error al actualizar la empresa',
          )
        }

        if (mediaAsset && company?.logoId) {
          try {
            await this.mediaRepository.updateById(
              company.logoId,
              mediaAsset,
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new InternalServerErrorException(
              'Error al actualizar el logo de la empresa',
            )
          }
        } else if (mediaAsset && !company?.logoId) {
          try {
            const mediaAssetCreated = await this.mediaRepository.create(
              mediaAsset,
              manager,
            )

            await this.companyRepository.updateById(
              company.id,
              { logoId: mediaAssetCreated.id },
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new InternalServerErrorException(
              'Error al crear el logo de la empresa',
            )
          }
        }
        return companyToUpdate ?? company
      },
    )

    return await this.companyRepository.findById(companyTransaction.id)
  }
}
