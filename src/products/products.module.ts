import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { FIND_ALL_PRODUCT_CAPACITY__SERVICE } from './domain/services/product-capacity/IProductCapacityService'
import { FindAllProductCapacityService } from './app/product-capacity/find-all-product-capacity.service'
import { FIND_ALL_PRODUCTS_SERVICE } from './domain/services/products/IProductService'
import { FindAllProductsService } from './app/products/find-all-products.service'
import { GetAllProductsController } from './infra/controllers/products/get-all-products.controller'
import { GetAllProductCapacityController } from './infra/controllers/product-capacity/get-all-product-capacity.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: FIND_ALL_PRODUCT_CAPACITY__SERVICE,
      useClass: FindAllProductCapacityService,
    },
    {
      provide: FIND_ALL_PRODUCTS_SERVICE,
      useClass: FindAllProductsService,
    },
  ],
  controllers: [GetAllProductsController, GetAllProductCapacityController],
})
export class ProductsModule {}
