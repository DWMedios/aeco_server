import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import {
  ADVERTISING_REPOSITORY,
  CAMPAIGN_REPOSITORY,
  COMPANY_REPOSITORY,
  CONTRACTOR_REPOSITORY,
  type ICompanyRepository,
  type IAdvertisingRepository,
  type ICampaignRepository,
  type IContractorRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type {
  ICampaign,
  IAdvertising,
  IContractor,
} from '@common/domain/entities'
import type { UpdateAdvertisingDto } from '@advertisings/domain/dto/advertisings/UpdateAdvertising.dto'
import type { IUpdateAdvertisingService } from '@advertisings/domain/services/advertisings/IUpdateAdvertisingService'

@Injectable()
export class UpdateAdvertisingService implements IUpdateAdvertisingService {
  logger = new Logger(UpdateAdvertisingService.name)

  constructor(
    @Inject(ADVERTISING_REPOSITORY)
    private readonly advertisingRepository: IAdvertisingRepository,
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(id: number, payload: UpdateAdvertisingDto): Promise<IAdvertising> {
    const { companyId, contractors, campaigns, ...advertisingData } = payload

    const advertising = await this.advertisingRepository.findById(id)
    if (!advertising) {
      throw new NotFoundException('El anuncio no existe')
    }

    if (companyId && advertising.companyId !== companyId) {
      const company = await this.companyRepository.findById(companyId)
      if (!company) {
        throw new NotFoundException('La empresa no existe')
      }
    }

    const currentCompanyId = companyId ?? advertising.companyId

    let contractorsExists: IContractor[] = []
    if (contractors?.length > 0) {
      console.log('companyId', companyId)
      console.log('contractors', contractors)
      contractorsExists = await this.contractorRepository.findManyByCompanyId(
        contractors,
        currentCompanyId,
      )
      if (contractorsExists.length !== contractors.length) {
        throw new BadRequestException('Algunos contratistas no existen')
      }
    }

    let campaignsExists: ICampaign[] = []
    if (campaigns?.length > 0) {
      campaignsExists = await this.campaignRepository.findManyByCompanyId(
        campaigns,
        currentCompanyId,
      )

      if (campaignsExists.length !== campaigns.length) {
        throw new BadRequestException('Algunas campañas no existen')
      }
    }

    const advertisingTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let advertisingToUpdate: IAdvertising | null = null

        try {
          if (contractors && contractors.length === 0) {
            advertising.contractors = []
          } else if (contractors?.length > 0) {
            advertising.contractors = contractorsExists
          }

          if (campaigns && campaigns.length === 0) {
            advertising.campaigns = []
          } else if (campaigns?.length > 0) {
            advertising.campaigns = campaignsExists
          }

          advertisingToUpdate = await this.advertisingRepository.updatePartial(
            advertising,
            {
              ...advertisingData,
              ...(companyId && { companyId }),
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al actualizar el anuncio')
        }

        return advertisingToUpdate ?? advertising
      })

    return await this.advertisingRepository.findById(advertisingTransaction.id)
  }
}
