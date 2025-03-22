import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { IDeleteCompanyService } from '@company/domain/services/IDeleteCompanyService'

@Injectable()
export class DeleteCompanyService implements IDeleteCompanyService {
  logger = new Logger(DeleteCompanyService.name)

  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const company = await this.companyRepository.findById(id)

    if (!company) throw new NotFoundException('La empresa no existe')

    const isDeleted = await this.transactionService.executeTransaction(
      async (manager) => {
        let deletedCompany: boolean = false
        try {
          deletedCompany = await this.companyRepository.softDelete(id, manager)
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al eliminar la empresa')
        }
        return deletedCompany
      },
    )

    return { success: isDeleted }
  }
}
