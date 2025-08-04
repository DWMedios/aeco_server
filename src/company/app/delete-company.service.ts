import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  DASHBOARD_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  REWARD_REPOSITORY,
  type IDashboardRepository,
  type IMediaAssetRepository,
  type IRewardRepository,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import type { IDeleteCompanyService } from '@company/domain/services/IDeleteCompanyService'

@Injectable()
export class DeleteCompanyService implements IDeleteCompanyService {
  logger = new Logger(DeleteCompanyService.name)

  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(MEDIA_ASSET_REPOSITORY)
    private readonly mediaRepository: IMediaAssetRepository,
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashbordRepository: IDashboardRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const company = await this.companyRepository.findById(id)

    if (!company) throw new NotFoundException('La empresa no existe')

    const isDeleted = await this.transactionService.executeTransaction(
      async (manager) => {
        let deletedCompany: boolean = false

        if (company?.logoId) {
          try {
            const logo = await this.mediaRepository.findById(
              company.logoId,
              manager,
            )
            if (logo) {
              const s3Key = `dw/${decodeURIComponent(logo.fileKey)}`
              const fileExists = await this.s3Service.fileExist(s3Key)
              let fileDeleted = false
              if (fileExists) {
                fileDeleted = await this.s3Service.deleteFile(s3Key)
              }
              if (fileDeleted) {
                await this.mediaRepository.softDelete(company.logoId, manager)
              }
            }
          } catch (error) {
            this.logger.error(error)
            throw new BadRequestException('Error al eliminar el logo')
          }
        }

        try {
          await this.rewardRepository.softDeleteByCompany(id, manager)
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al eliminar las recompensas')
        }

        try {
          await this.dashbordRepository.softDeleteDailyStatsByCompany(
            id,
            manager,
          )
          await this.dashbordRepository.softDeletePackagingStatsByCompany(
            id,
            manager,
          )
          await this.dashbordRepository.softDeleteProductStatsByCompany(
            id,
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al eliminar estadísticas')
        }

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
