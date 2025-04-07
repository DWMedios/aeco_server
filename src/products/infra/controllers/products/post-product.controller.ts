import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common'
import {
  CREATE_PRODUCT_SERVICE,
  type ICreateProductService,
} from '@products/domain/services/products/ICreateProductService'
import { CreateProductDto } from '@products/domain/dto/CreateProduct.dto'

@Controller('products')
export class PostProductController {
  logger = new Logger(PostProductController.name)

  constructor(
    @Inject(CREATE_PRODUCT_SERVICE)
    private readonly service: ICreateProductService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() payload: CreateProductDto) {
    return await this.service.run(payload)
  }
}
