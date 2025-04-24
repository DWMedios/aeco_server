import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import type { IAeco, ISetting } from '@common/domain/entities'
import type { FinishSetupDto } from '../domain/dto/FinishSetupDto'
import { FinishSetupType } from '../domain/enums/FinishSetupType.enum'
import { processImagesInJson } from '@shared/utils/imageHelper'
import type { IAecoService } from '@aecos/domain/services/IAecoService'

@Injectable()
export class AecoService implements IAecoService {
  logger = new Logger(AecoService.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async getInitialSetup(serialNumber: string): Promise<IAeco> {
    const aeco = await this.aecoRepository.initialSetup(serialNumber)

    if (!aeco) throw new NotFoundException('Aeco not found')

    if (aeco?.company?.settings && aeco.company.settings.key) {
      aeco.company.settings = (await processImagesInJson(
        aeco.company.settings,
        (key: string) => this.s3Service.getFileUrlIfExists(key),
      )) as ISetting
    }

    await Promise.all(
      aeco.pages.map(async (page) => {
        page.metadata = await processImagesInJson(
          page.metadata,
          (key: string) => this.s3Service.getFileUrlIfExists(key),
        )
      }),
    )
    return aeco
  }

  async finishSetup(data: FinishSetupDto): Promise<IAeco> {
    const exists = await this.aecoRepository.findBy({
      serialNumber: data.serialNumber,
    })

    if (!exists) throw new NotFoundException('Aeco not found')
    const update: { initialSetup?: boolean; needsUpdate?: boolean } = {}
    if (data.type == FinishSetupType.INIT) update.initialSetup = false
    else update.needsUpdate = false

    try {
      const aecoUpdated = await this.aecoRepository.update(exists, update)
      return await this.aecoRepository.findBy({ id: aecoUpdated.id })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error finishing setup')
    }
  }
}
