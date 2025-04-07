import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { FIND_ALL_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/IFindAllProductCapacityService'
import { FindAllProductCapacityService } from './app/product-capacity/find-all-product-capacity.service'
import { FIND_ALL_PRODUCTS_SERVICE } from './domain/services/products/IFindAllProductService'
import { FindAllProductsService } from './app/products/find-all-products.service'
import { GetAllProductsController } from './infra/controllers/products/get-all-products.controller'
import { GetAllProductCapacityController } from './infra/controllers/product-capacity/get-all-product-capacity.controller'
import { FIND_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/IFindProductCapacityService'
import { FindProductCapacityService } from './app/product-capacity/find-product-capacity.service'
import { FIND_PRODUCT_SERVICE } from './domain/services/products/IFindProductService'
import { FindProductService } from './app/products/find-product.service'
import { GetProductController } from './infra/controllers/products/get-product.controller'
import { GetProductCapacityController } from './infra/controllers/product-capacity/get-product-capacity.controller'
import { CREATE_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/ICreateProductCapacityService'
import { CreateProductCapacityService } from './app/product-capacity/create-product-capacity.service'
import { CREATE_PRODUCT_SERVICE } from './domain/services/products/ICreateProductService'
import { CreateProductService } from './app/products/create-product.service'
import { PostProductCapacityController } from './infra/controllers/product-capacity/post-product-capacity.controller'
import { PostProductController } from './infra/controllers/products/post-product.controller'
import { UPDATE_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/IUpdateProductCapacityService'
import { UpdateProductCapacityService } from './app/product-capacity/update-product-capacity.service'
import { UPDATE_PRODUCT_SERVICE } from './domain/services/products/IUpdateProductService'
import { UpdateProductService } from './app/products/update-product.service'
import { PutProductCapacityController } from './infra/controllers/product-capacity/put-product-capacity.controller'
import { PutProductController } from './infra/controllers/products/put-product.controller'
import { DELETE_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/IDeleteProductCapacityService'
import { DeleteProductCapacityService } from './app/product-capacity/delete-product-capacity.service'
import { DELETE_PRODUCT_SERVICE } from './domain/services/products/IDeleteProductService'
import { DeleteProductService } from './app/products/delete-product.service'
import { DeleteProductCapacityController } from './infra/controllers/product-capacity/delete-product-capacity.controller'
import { DeleteProductController } from './infra/controllers/products/delete-product.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: FIND_ALL_PRODUCT_CAPACITY_SERVICE,
      useClass: FindAllProductCapacityService,
    },
    {
      provide: FIND_ALL_PRODUCTS_SERVICE,
      useClass: FindAllProductsService,
    },
    {
      provide: FIND_PRODUCT_CAPACITY_SERVICE,
      useClass: FindProductCapacityService,
    },
    {
      provide: FIND_PRODUCT_SERVICE,
      useClass: FindProductService,
    },
    {
      provide: CREATE_PRODUCT_CAPACITY_SERVICE,
      useClass: CreateProductCapacityService,
    },
    {
      provide: CREATE_PRODUCT_SERVICE,
      useClass: CreateProductService,
    },
    {
      provide: UPDATE_PRODUCT_CAPACITY_SERVICE,
      useClass: UpdateProductCapacityService,
    },
    {
      provide: UPDATE_PRODUCT_SERVICE,
      useClass: UpdateProductService,
    },
    {
      provide: DELETE_PRODUCT_CAPACITY_SERVICE,
      useClass: DeleteProductCapacityService,
    },
    {
      provide: DELETE_PRODUCT_SERVICE,
      useClass: DeleteProductService,
    },
  ],
  controllers: [
    GetAllProductsController,
    GetAllProductCapacityController,
    GetProductController,
    GetProductCapacityController,
    PostProductCapacityController,
    PostProductController,
    PutProductCapacityController,
    PutProductController,
    DeleteProductCapacityController,
    DeleteProductController,
  ],
})
export class ProductsModule {}
