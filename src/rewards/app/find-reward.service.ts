import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  REWARD_REPOSITORY,
  type IRewardRepository,
} from '@shared/domain/repositories'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import type { IReward } from '@common/domain/entities'
import type { IFindRewardService } from '@rewards/domain/services/IFindRewardService'

@Injectable()
export class FindRewardService implements IFindRewardService {
  logger = new Logger(FindRewardService.name)

  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(id: number): Promise<IReward & { imageUrl?: string }> {
    const reward = await this.rewardRepository.findById(id)

    if (!reward) throw new NotFoundException('La recompensa no existe')

    let imageUrl: string | null = null
    if (reward.imageId) {
      const mediaAsset = reward.mediaAsset
      const s3Key = `dw/${decodeURIComponent(mediaAsset.fileKey)}`
      const fileExists = await this.s3Service.fileExist(s3Key)
      if (fileExists) {
        imageUrl = await this.s3Service.getPresignedUrl(s3Key)
      }
    }

    return {
      ...reward,
      imageUrl,
    }
  }
}
