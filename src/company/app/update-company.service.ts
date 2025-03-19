import { Injectable, Inject, BadRequestException, Logger } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  type ISettingRepository,
  SETTING_REPOSITORY,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { ICompany } from '@common/domain/entities'
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
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(companyId: number, request: UpdateCompanyDto): Promise<ICompany> {
    const { legalRepresentative, settings, ...reqCompany } = request

    const company = await this.companyRepository.findById(companyId)

    if (!company) throw new BadRequestException('La empresa no existe')

    if (reqCompany.name) {
      const existsName = await this.companyRepository.exists({
        name: reqCompany.name,
      })

      if (existsName) throw new BadRequestException('La empresa ya existe')
    }

    const companyTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        const { settings: foundedSettings, ...foundedCompany } = company
        let companyToUpdate: ICompany | null = null
        try {
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

        return companyToUpdate
      },
    )

    return await this.companyRepository.findById(companyTransaction.id)
  }
}
