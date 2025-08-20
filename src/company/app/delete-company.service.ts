import {
  Inject,
  Logger,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  AECO_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
  COMPANY_REPOSITORY,
  CAMPAIGN_REPOSITORY,
  DASHBOARD_REPOSITORY,
  CONTRACTOR_REPOSITORY,
  ADVERTISING_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  type IAecoRepository,
  type IRoleRepository,
  type IUserRepository,
  type ICompanyRepository,
  type ICampaignRepository,
  type IDashboardRepository,
  type IContractorRepository,
  type IAdvertisingRepository,
  type IMediaAssetRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
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
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
    @Inject(ADVERTISING_REPOSITORY)
    private readonly advertisingRepository: IAdvertisingRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
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
        // Soft Delete Stats
        try {
          await this.dashboardRepository.softDeleteDailyStatsByCompany(
            company.id,
            manager,
          )
          await this.dashboardRepository.softDeletePackagingStatsByCompany(
            company.id,
            manager,
          )
          await this.dashboardRepository.softDeleteProductStatsByCompany(
            company.id,
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException(
            'Error al eliminar estadísticas',
          )
        }

        // Falta eliminar Tickets and items (preguntar)
        // Soft Delete Campaigns, Contractors and Advertisings
        try {
          await this.campaignRepository.updateManyByCompany(
            company.id,
            { isEnabled: false },
            manager,
          )
          await this.campaignRepository.softDeleteManyByCompany(
            company.id,
            manager,
          )
          await this.contractorRepository.softDeleteManyByCompany(
            company.id,
            manager,
          )
          await this.advertisingRepository.updateManyByCompany(
            company.id,
            { isEnabled: false },
            manager,
          )
          await this.advertisingRepository.softDeleteManyByCompany(
            company.id,
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException(
            'Error al eliminar campañas o contratistas',
          )
        }

        // Disable and Soft Delete AECOs
        try {
          await this.aecoRepository.updateManyByCompany(
            id,
            {
              status: AecoStatusEnum.DISABLED,
              isOnline: false,
              initialSetup: false,
              needsUpdate: false,
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException('Error al eliminar los AECOs')
        }

        // Disable and Soft Delete Company
        try {
          await this.companyRepository.updateById(
            company.id,
            {
              name: `${company.name}_deleted_${Number(new Date())}`,
              rfc: `${company.rfc}_deleted_${Number(new Date())}`,
              status: false,
            },
            manager,
          )
          deletedCompany = await this.companyRepository.softDelete(id, manager)
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException('Error al eliminar la empresa')
        }

        const users = await this.userRepository.findManyByCompanyId(
          company.id,
          manager,
        )
        // Disable and Soft Delete Users and Roles
        if (users.length > 0) {
          const userIds = users.map((user) => user.id)
          try {
            await this.roleRepository.softDeleteManyByUsers(userIds, manager)
            for (const user of users) {
              await this.userRepository.updateById(
                user.id,
                {
                  isActive: false,
                  email: `${user.email}_deleted_${Number(new Date())}`,
                },
                manager,
              )
            }
            await this.userRepository.softDeleteManyByCompany(
              company.id,
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new InternalServerErrorException('Error al eliminar usuarios')
          }
        }

        // Delete Media Assets from S3 and Soft Delete from DB
        if (deletedCompany) {
          const mediaAssets = await this.mediaRepository.findManyByCompanyId(
            company.id,
            manager,
          )
          if (mediaAssets.length > 0) {
            for (const media of mediaAssets) {
              try {
                const s3Key = `dw/${decodeURIComponent(media.fileKey)}`
                const fileExists = await this.s3Service.fileExist(s3Key)
                let fileDeleted = false
                if (fileExists) {
                  fileDeleted = await this.s3Service.deleteFile(s3Key)
                }
                if (fileDeleted) {
                  await this.mediaRepository.softDelete(media.id, manager)
                }
              } catch (error) {
                this.logger.error(error)
                throw new InternalServerErrorException(
                  'Error al eliminar el archivo',
                )
              }
            }
          }
        }
        return deletedCompany
      },
    )

    return { success: isDeleted }
  }
}
