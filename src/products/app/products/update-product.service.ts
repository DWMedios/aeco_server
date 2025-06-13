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
import type { UpdateProductDto } from '@products/domain/dto/UpdateProduct.dto copy'
import type { IUpdateProductService } from '@products/domain/services/products/IUpdateProductService'

@Injectable()
export class UpdateProductService implements IUpdateProductService {
  logger = new Logger(UpdateProductService.name)

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(PRODUCT_CAPACITY_REPOSITORY)
    private readonly productCapacityRepository: IProductCapacityRepository,
  ) {}

  async run(id: number, request: UpdateProductDto): Promise<IProduct> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundException('El producto no existe')
    }

    if (request.capacityId) {
      const capacity = await this.productCapacityRepository.findById(
        request.capacityId,
      )

      if (!capacity) {
        throw new NotFoundException('La capacidad del producto no existe')
      }
    }

    if (request.code) {
      const existByCode = await this.productRepository.existsBy({
        code: request.code,
      })

      if (existByCode) {
        throw new BadRequestException('El código del producto ya existe')
      }
    }

    try {
      const updateProduct = await this.productRepository.updateById(id, request)
      return await this.productRepository.findById(updateProduct.id, true)
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto')
    }
  }
}
