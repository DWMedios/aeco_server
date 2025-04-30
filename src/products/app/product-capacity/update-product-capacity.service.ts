import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  PRODUCT_CAPACITY_REPOSITORY,
  type IProductCapacityRepository,
} from '@shared/domain/repositories'
import type { IProductCapacity } from '@common/domain/entities'
import type { UpdateProductCapacityDto } from '@products/domain/dto/UpdateProductCapacity.dto'
import type { IUpdateProductCapacityService } from '@products/domain/services/product-capacity/IUpdateProductCapacityService'

@Injectable()
export class UpdateProductCapacityService
  implements IUpdateProductCapacityService
{
  logger = new Logger(UpdateProductCapacityService.name)

  constructor(
    @Inject(PRODUCT_CAPACITY_REPOSITORY)
    private readonly productCapacityRepository: IProductCapacityRepository,
  ) {}

  async run(
    id: number,
    request: UpdateProductCapacityDto,
  ): Promise<IProductCapacity> {
    const findCapacity = await this.productCapacityRepository.findById(id)

    if (!findCapacity) {
      throw new NotFoundException('La capacidad del producto no existe')
    }

    const capacityExistsBy: any = {}

    if (request.packaging) {
      capacityExistsBy.packaging = request.packaging
    } else {
      capacityExistsBy.packaging = findCapacity.packaging
    }

    if (request.weight) {
      capacityExistsBy.weight = request.weight
    } else {
      capacityExistsBy.weight = findCapacity.weight
    }

    if (request.factor) {
      capacityExistsBy.factor = request.factor
    } else {
      capacityExistsBy.factor = findCapacity.factor
    }

    const existBy =
      await this.productCapacityRepository.existsBy(capacityExistsBy)

    if (existBy) {
      throw new BadRequestException('La capacidad del producto ya existe')
    }

    try {
      const capacityUpdated = await this.productCapacityRepository.updateById(
        id,
        request,
      )

      return this.productCapacityRepository.findById(capacityUpdated.id)
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear la capacidad del producto',
      )
    }
  }
}
