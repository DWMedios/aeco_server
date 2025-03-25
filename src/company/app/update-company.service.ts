import { Injectable, Inject, BadRequestException, Logger } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  SETTING_REPOSITORY,
  AECO_REPOSITORY,
  type ICompanyRepository,
  type ISettingRepository,
  type IAecoRepository,
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
    @Inject(SETTING_REPOSITORY)
    private readonly settingRepository: ISettingRepository,
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(companyId: number, request: UpdateCompanyDto): Promise<ICompany> {
    const { legalRepresentative, settings, aecos, ...reqCompany } = request

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
        const { settings: foundedSettings, ...foundedCompany } = company
        let companyToUpdate: ICompany | null = null
        try {
          if (aecos && aecos.length === 0) {
            foundedCompany.aecos = []
          } else {
            foundedCompany.aecos = aecosExists
          }

          companyToUpdate = await this.companyRepository.update(
            foundedCompany,
            {
              ...reqCompany,
              legalRepresentative: {
                ...foundedCompany.legalRepresentative,
                ...(legalRepresentative && { ...legalRepresentative }),
              },
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al crear la empresa')
        }

        if (settings) {
          try {
            await this.settingRepository.update(
              foundedSettings.id,
              {
                ...settings,
                metadata: {
                  ...foundedSettings.metadata,
                  ...(settings.metadata && { ...settings.metadata }),
                },
              },
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException(
              'Error al crear la configuración de la empresa',
            )
          }
        }
        return companyToUpdate
      },
    )

    return await this.companyRepository.findById(companyTransaction.id)
  }
}
