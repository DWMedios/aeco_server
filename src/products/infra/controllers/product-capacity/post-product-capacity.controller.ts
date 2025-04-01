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
  CREATE_PRODUCT_CAPACITY_SERVICE,
  type ICreateProductCapacityService,
} from '@products/domain/services/product-capacity/ICreateProductCapacityService'
import { CreateProductCapacityDto } from '@products/domain/dto/CreateProductCapacity.dto'

@Controller('products/capacities')
export class PostProductCapacityController {
  logger = new Logger(PostProductCapacityController.name)

  constructor(
    @Inject(CREATE_PRODUCT_CAPACITY_SERVICE)
    private readonly service: ICreateProductCapacityService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProductCapacity(@Body() payload: CreateProductCapacityDto) {
    return await this.service.run(payload)
  }
}
