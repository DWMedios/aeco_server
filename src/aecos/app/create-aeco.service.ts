import {
  Injectable,
  Inject,
  BadRequestException,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  AECO_REPOSITORY,
  COMPANY_REPOSITORY,
  type IAecoRepository,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
import type { IAeco } from '@common/domain/entities'
import type { CreateAecoDto } from '@aecos/domain/dto/CreateAeco.dto'
import type { ICreateAecoService } from '@aecos/domain/services/ICreateAecoService'

@Injectable()
export class CreateAecoService implements ICreateAecoService {
  logger = new Logger(CreateAecoService.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(request: CreateAecoDto): Promise<IAeco> {
    if (request.companyId) {
      const companyExists = await this.companyRepository.exists({
        id: request.companyId,
      })

      if (!companyExists) throw new NotFoundException('La empresa no existe')
    }

    const aecoSerialExists = await this.aecoRepository.findBy({
      serialNumber: request.serialNumber,
      status: AecoStatusEnum.ENABLED,
    })

    if (aecoSerialExists) {
      throw new BadRequestException('Ya existe un Aeco con ese serial')
    }

    const aecoNameExists = await this.aecoRepository.findBy({
      name: request.name,
      status: AecoStatusEnum.ENABLED,
    })

    if (aecoNameExists) {
      throw new BadRequestException('Ya existe un Aeco con ese nombre')
    }

    try {
      const count = await this.aecoRepository.count()
      const aeco = await this.aecoRepository.create({
        ...request,
        folio: this.nextFolio(count),
      })
      return await this.aecoRepository.findBy({ id: aeco.id })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error al crear el Aeco')
    }
  }

  private nextFolio(count: number): string {
    const nextcount = count + 1
    const folio = nextcount.toString().padStart(5, '0')
    return folio
  }
}
