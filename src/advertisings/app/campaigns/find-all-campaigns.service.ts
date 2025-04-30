import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  CAMPAIGN_REPOSITORY,
  type ICampaignRepository,
} from '@shared/domain/repositories'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { ICampaign } from '@common/domain/entities'
import type { CampaignFiltersDto } from '@advertisings/domain/dto/Filters.dto'
import type { IFindAllCampaignService } from '@advertisings/domain/services/campaigns/IFindAllCampaignService'

@Injectable()
export class FindAllCampaignService implements IFindAllCampaignService {
  logger = new Logger(FindAllCampaignService.name)

  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(
    filters: CampaignFiltersDto,
  ): Promise<PageMetaDto<ICampaign & { mediaUrl?: string }>> {
    try {
      const [entities, total] = await this.campaignRepository.findAll(filters)

      const campaignsWithMedia = await this.getMediaUrls(entities)

      return new PageMetaDto<ICampaign & { mediaUrl?: string }>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: campaignsWithMedia,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('No se pudo obtener las campañas')
    }
  }

  private async getMediaUrls(
    campaigns: ICampaign[],
  ): Promise<Partial<ICampaign & { mediaUrl?: string }>[]> {
    const campaignsWithMedia = await Promise.all(
      campaigns.map(async (campaign) => {
        let mediaUrl: string | null = null

        if (campaign.mediaId) {
          const mediaAsset = campaign.mediaAsset
          const s3Key = `dw/${decodeURIComponent(mediaAsset.fileKey)}`
          const fileExists = await this.s3Service.fileExist(s3Key)
          if (fileExists) {
            mediaUrl = await this.s3Service.getPresignedUrl(s3Key)
          }
        }

        return {
          ...campaign,
          mediaUrl,
        }
      }),
    )

    return campaignsWithMedia
  }
}
