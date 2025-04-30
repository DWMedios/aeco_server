import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import {
  CAMPAIGN_REPOSITORY,
  type ICampaignRepository,
} from '@shared/domain/repositories'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import type { ICampaign } from '@common/domain/entities'
import type { IFindCampaignService } from '@advertisings/domain/services/campaigns/IFindCampaignService'

@Injectable()
export class FindCampaignService implements IFindCampaignService {
  logger = new Logger(FindCampaignService.name)

  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(id: number): Promise<ICampaign & { mediaUrl?: string }> {
    const campaign = await this.campaignRepository.findById(id)
    if (!campaign) {
      throw new NotFoundException('La campaña no existe')
    }

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
  }
}
