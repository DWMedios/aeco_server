import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import {
  S3_SERVICES,
  type IS3Service,
} from '@shared/domain/services/IS3Service'
import type { IAecoService } from '../domain/IAecoService'
import type { IAeco, ISetting } from '@common/domain/entities'
import type { CreateAecoDto } from '../domain/dto/AecoDto'
import type { UpdateAecoDto } from '../domain/dto/UpdateAecoDto'
import type { FinishSetupDto } from '../domain/dto/FinishSetupDto'
import { FinishSetupType } from '../domain/enums/FinishSetupType.enum'
import { processImagesInJson } from '@shared/domain/utils/imageHelper'

@Injectable()
export class AecosService implements IAecoService {
  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(S3_SERVICES)
    private readonly s3Service: IS3Service,
  ) {}

  async find(aecoId: number): Promise<Partial<IAeco>> {
    const exists = await this.aecoRepository.exists({
      id: aecoId,
    })
    if (!exists) throw new BadRequestException('Aeco not found')

    const aeco = await this.aecoRepository.find(aecoId)

    return aeco
  }

  async create(newAeco: CreateAecoDto): Promise<IAeco> {
    const exists = await this.aecoRepository.exists({
      name: newAeco.name,
    })

    if (exists) throw new BadRequestException('Aeco already exists')

    return await this.aecoRepository.create(newAeco)
  }

  async update(aeco: UpdateAecoDto, aecoId: number): Promise<IAeco> {
    const exists = await this.aecoRepository.find(aecoId)
    if (!exists) throw new NotFoundException('Aeco not found')

    return await this.aecoRepository.update(exists, aeco)
  }

  async getInitialSetup(serialNumber: string) {
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

  async getUpdates(serialNumber: string) {
    const aeco = await this.aecoRepository.getUpdates(serialNumber)

    if (!aeco) throw new NotFoundException('Aeco not found')

    if (!aeco.needsUpdate)
      throw new NotFoundException('No pending updates found')

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

  async finishSetup(data: FinishSetupDto) {
    const exists = await this.aecoRepository.findBySerialNumber(
      data.serialNumber,
    )

    if (!exists) throw new NotFoundException('Aeco not found')
    const update: { initialSetup?: boolean; needsUpdate?: boolean } = {}
    if (data.type == FinishSetupType.INIT) update.initialSetup = false
    else update.needsUpdate = false

    return await this.aecoRepository.update(exists, update)
  }

  async delete(aecoId: number): Promise<boolean> {
    const exists = await this.aecoRepository.exists({
      id: aecoId,
    })
    if (!exists) throw new BadRequestException('Aeco not found')

    return await this.aecoRepository.delete(aecoId)
  }
}
