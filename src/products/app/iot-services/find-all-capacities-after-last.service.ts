import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  PRODUCT_CAPACITY_REPOSITORY,
  type IProductCapacityRepository,
} from '@shared/domain/repositories'
import type { IProductCapacity } from '@common/domain/entities'
import type { IFindAllCapacitiesAfterLastService } from '@products/domain/services/iot-services/IFindAllCapacitiesAfterLastService'

@Injectable()
export class FindAllCapacitiesAfterLastService
  implements IFindAllCapacitiesAfterLastService
{
  logger = new Logger(FindAllCapacitiesAfterLastService.name)

  constructor(
    @Inject(PRODUCT_CAPACITY_REPOSITORY)
    private readonly productCapacityRepository: IProductCapacityRepository,
  ) {}

  async run(lastId: number): Promise<IProductCapacity[]> {
    try {
      const entities =
        await this.productCapacityRepository.findAllAfterLast(lastId)

      return entities
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        'No se pudo obtener las capacidades de producto',
      )
    }
  }
}
