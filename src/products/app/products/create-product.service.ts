import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  PRODUCT_REPOSITORY,
  PRODUCT_CAPACITY_REPOSITORY,
  type IProductRepository,
  type IProductCapacityRepository,
} from '@shared/domain/repositories'
import type { IProduct } from '@common/domain/entities'
import type { CreateProductDto } from '@products/domain/dto/CreateProduct.dto'
import type { ICreateProductService } from '@products/domain/services/products/ICreateProductService'

@Injectable()
export class CreateProductService implements ICreateProductService {
  logger = new Logger(CreateProductService.name)

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(PRODUCT_CAPACITY_REPOSITORY)
    private readonly productCapacityRepository: IProductCapacityRepository,
  ) {}

  async run(request: CreateProductDto): Promise<IProduct> {
    const capacity = await this.productCapacityRepository.findById(
      request.capacityId,
    )

    if (!capacity) {
      throw new NotFoundException('La capacidad del producto no existe')
    }

    const existByCode = await this.productRepository.existsBy({
      code: request.code,
    })

    if (existByCode) {
      throw new BadRequestException('El código del producto ya existe')
    }

    try {
      const newProduct = await this.productRepository.create(request)
      return await this.productRepository.findById(newProduct.id, true)
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto')
    }
  }
}
