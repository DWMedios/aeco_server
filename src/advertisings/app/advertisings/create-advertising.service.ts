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
  ICompanyRepository,
  type ICampaignRepository,
  type IContractorRepository,
  type IAdvertisingRepository,
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
import type { CreateAdvertisingDto } from '@advertisings/domain/dto/advertisings/CreateAdvertising.dto'
import type { ICreateAdvertisingService } from '@advertisings/domain/services/advertisings/ICreateAdvertisingService'

@Injectable()
export class CreateAdvertisingService implements ICreateAdvertisingService {
  logger = new Logger(CreateAdvertisingService.name)

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

  async run(payload: CreateAdvertisingDto): Promise<IAdvertising> {
    const { companyId, contractors, campaigns, ...advertisingData } = payload

    const company = await this.companyRepository.findById(companyId)
    if (!company) {
      throw new NotFoundException('La empresa especificada no existe')
    }

    let contractorsExists: IContractor[] = []
    if (contractors?.length > 0) {
      contractorsExists = await this.contractorRepository.findManyByCompanyId(
        contractors,
        company.id,
      )
      if (contractorsExists.length !== contractors.length) {
        throw new BadRequestException('Algunos contratistas no existen')
      }
    }

    let campaignsExists: ICampaign[] = []
    if (campaigns?.length > 0) {
      campaignsExists = await this.campaignRepository.findManyByCompanyId(
        campaigns,
        company.id,
      )
      if (campaignsExists.length !== campaigns.length) {
        throw new BadRequestException('Algunas campañas no existen')
      }
    }

    const advertisingTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let newAdvertising: IAdvertising | null = null

        try {
          newAdvertising = await this.advertisingRepository.create(
            {
              ...advertisingData,
              companyId: company.id,
              ...(contractorsExists?.length > 0 && {
                contractors: contractorsExists,
              }),
              ...(campaignsExists?.length > 0 && {
                campaigns: campaignsExists,
              }),
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new BadRequestException('Error al crear el anuncio')
        }

        return newAdvertising
      })

    return await this.advertisingRepository.findById(advertisingTransaction.id)
  }
}
