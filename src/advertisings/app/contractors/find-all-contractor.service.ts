import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  CONTRACTOR_REPOSITORY,
  type IContractorRepository,
} from '@shared/domain/repositories'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { IContractor } from '@common/domain/entities'
import type { ContractorFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { IFindAllContractorService } from '@advertisings/domain/services/contractors/IFindAllContractorService'

@Injectable()
export class FindAllContractorService implements IFindAllContractorService {
  logger = new Logger(FindAllContractorService.name)

  constructor(
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(
    filters: ContractorFiltersDto,
  ): Promise<PageMetaDto<IContractor & { logoUrl?: string }>> {
    try {
      const [entities, total] = await this.contractorRepository.findAll(filters)

      const contractorsWithLogo = await this.getLogos(entities)

      return new PageMetaDto<IContractor & { logoUrl?: string }>({
        total,
        pageOptionsDto: filters,
        records: contractorsWithLogo,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        'Error al recuperar los contratistas',
      )
    }
  }

  private async getLogos(contractors: IContractor[]): Promise<IContractor[]> {
    const contractorsWithLogo = await Promise.all(
      contractors.map(async (contractor) => {
        let logoUrl: string | null = null

        if (contractor.logoId) {
          const mediaAsset = contractor.mediaAsset
          const s3Key = `dw/${decodeURIComponent(mediaAsset.fileKey)}`
          const fileExists = await this.s3Service.fileExist(s3Key)
          if (fileExists) {
            logoUrl = await this.s3Service.getPresignedUrl(s3Key)
          }
        }

        return {
          ...contractor,
          logoUrl,
        }
      }),
    )

    return contractorsWithLogo
  }
}
