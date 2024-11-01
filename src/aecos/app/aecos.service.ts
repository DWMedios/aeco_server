import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import type { IAecoService } from '../domain/IAecoService'
import type { IAeco } from '@common/domain/entities'
import type { CreateAecoDto } from '../domain/dto/AecoDto'
import type { UpdateAecoDto } from '../domain/dto/UpdateAecoDto'

@Injectable()
export class AecosService implements IAecoService {
  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
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
    if (!exists) throw new BadRequestException('Aeco not found')

    return await this.aecoRepository.update(exists, aeco)
  }

  async getInitialSetup(serialNumber: string) {
    const aeco = await this.aecoRepository.initialSetup(serialNumber)

    if (!aeco) throw new Error('Aeco not found')

    return aeco
  }

  async delete(aecoId: number): Promise<boolean> {
    const exists = await this.aecoRepository.exists({
      id: aecoId,
    })
    if (!exists) throw new BadRequestException('Aeco not found')

    return await this.aecoRepository.delete(aecoId)
  }
}
