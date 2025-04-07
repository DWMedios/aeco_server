import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  PRODUCT_CAPACITY_REPOSITORY,
  type IProductCapacityRepository,
} from '@shared/domain/repositories'
import type { IProductCapacity } from '@common/domain/entities'
import type { CreateProductCapacityDto } from '@products/domain/dto/CreateProductCapacity.dto'
import type { ICreateProductCapacityService } from '@products/domain/services/product-capacity/ICreateProductCapacityService'

@Injectable()
export class CreateProductCapacityService
  implements ICreateProductCapacityService
{
  logger = new Logger(CreateProductCapacityService.name)

  constructor(
    @Inject(PRODUCT_CAPACITY_REPOSITORY)
    private readonly productCapacityRepository: IProductCapacityRepository,
  ) {}

  async run(request: CreateProductCapacityDto): Promise<IProductCapacity> {
    const existBy = await this.productCapacityRepository.existsBy({
      packaging: request.packaging,
      weight: request.weight,
      factor: request.factor,
    })

    if (existBy) {
      throw new BadRequestException('La capacidad del producto ya existe')
    }

    try {
      const newCapacity = await this.productCapacityRepository.create(request)

      return this.productCapacityRepository.findById(newCapacity.id)
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear la capacidad del producto',
      )
    }
  }
}
