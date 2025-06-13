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
import type { IAeco } from '@common/domain/entities'
import type { UpdateAecoDto } from '@aecos/domain/dto/UpdateAecoDto'
import type { IAecoFilterOptions } from '@aecos/domain/Types'
import type { IUpdateAecoService } from '@aecos/domain/services/IUpdateAecoService'

@Injectable()
export class UpdateAecoService implements IUpdateAecoService {
  logger = new Logger(UpdateAecoService.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(aecoId: number, request: UpdateAecoDto): Promise<IAeco> {
    const aeco = await this.aecoRepository.findBy({ id: aecoId })

    if (!aeco) throw new NotFoundException('Aeco not found')

    if (request.companyId) {
      const companyExists = await this.companyRepository.exists({
        id: request.companyId,
      })

      if (!companyExists) throw new NotFoundException('La empresa no existe')
    }

    const aecoExist: IAecoFilterOptions = {}

    if (request?.name) aecoExist.name = request.name
    if (request?.serialNumber) aecoExist.serialNumber = request.serialNumber

    if (Object.keys(aecoExist).length) {
      const aecoExists = await this.aecoRepository.findBy(aecoExist)

      if (aecoExists) {
        throw new BadRequestException(
          'Ya existe un Aeco con ese nombre o serial',
        )
      }
    }

    try {
      delete aeco.company
      const aecoUpdated = await this.aecoRepository.partialUpdate(aeco, {
        ...aeco,
        ...request,
        currentCoords: {
          ...aeco.currentCoords,
          ...request.currentCoords,
        },
        ...(request.companyId && { companyId: request.companyId }),
      })
      return await this.aecoRepository.findBy({ id: aecoUpdated.id })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error al actualizar el Aeco')
    }
  }
}
