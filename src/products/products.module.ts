import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
// Productos
import { FIND_ALL_PRODUCTS_SERVICE } from './domain/services/products/IFindAllProductService'
import { FindAllProductsService } from './app/products/find-all-products.service'
import { GetAllProductsController } from './infra/controllers/products/get-all-products.controller'
import { FIND_PRODUCT_SERVICE } from './domain/services/products/IFindProductService'
import { FindProductService } from './app/products/find-product.service'
import { GetProductController } from './infra/controllers/products/get-product.controller'
import { CREATE_PRODUCT_SERVICE } from './domain/services/products/ICreateProductService'
import { CreateProductService } from './app/products/create-product.service'
import { PostProductController } from './infra/controllers/products/post-product.controller'
import { UPDATE_PRODUCT_SERVICE } from './domain/services/products/IUpdateProductService'
import { UpdateProductService } from './app/products/update-product.service'
import { PutProductController } from './infra/controllers/products/put-product.controller'
import { DELETE_PRODUCT_SERVICE } from './domain/services/products/IDeleteProductService'
import { DeleteProductService } from './app/products/delete-product.service'
import { DeleteProductController } from './infra/controllers/products/delete-product.controller'
// Capacidades de productos
import { FIND_ALL_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/IFindAllProductCapacityService'
import { FindAllProductCapacityService } from './app/product-capacity/find-all-product-capacity.service'
import { GetAllProductCapacityController } from './infra/controllers/product-capacity/get-all-product-capacity.controller'
import { FIND_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/IFindProductCapacityService'
import { FindProductCapacityService } from './app/product-capacity/find-product-capacity.service'
import { GetProductCapacityController } from './infra/controllers/product-capacity/get-product-capacity.controller'
import { CREATE_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/ICreateProductCapacityService'
import { CreateProductCapacityService } from './app/product-capacity/create-product-capacity.service'
import { PostProductCapacityController } from './infra/controllers/product-capacity/post-product-capacity.controller'
import { UPDATE_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/IUpdateProductCapacityService'
import { UpdateProductCapacityService } from './app/product-capacity/update-product-capacity.service'
import { PutProductCapacityController } from './infra/controllers/product-capacity/put-product-capacity.controller'
import { DELETE_PRODUCT_CAPACITY_SERVICE } from './domain/services/product-capacity/IDeleteProductCapacityService'
import { DeleteProductCapacityService } from './app/product-capacity/delete-product-capacity.service'
import { DeleteProductCapacityController } from './infra/controllers/product-capacity/delete-product-capacity.controller'
// Servicios IOT
import { FIND_ALL_PRODUCTS_AFTER_LAST_SERVICE } from './domain/services/iot-services/IFindAllProductsAfterLastService'
import { FindAllProductsAfterLastService } from './app/iot-services/find-all-products-after-last.service'
import { GetAllProductsAfterLastController } from './infra/controllers/iot-controllers/get-all-products-after-last.controller'
import { FIND_ALL_CAPACITIES_AFTER_LAST_SERVICE } from './domain/services/iot-services/IFindAllCapacitiesAfterLastService'
import { FindAllCapacitiesAfterLastService } from './app/iot-services/find-all-capacities-after-last.service'
import { GetAllProductCapacityAfterLastController } from './infra/controllers/iot-controllers/get-all-capacities-after-last.controller'

@Module({
  imports: [SharedModule],
  providers: [
    // Providers para productos
    {
      provide: FIND_ALL_PRODUCTS_SERVICE,
      useClass: FindAllProductsService,
    },
    {
      provide: FIND_PRODUCT_SERVICE,
      useClass: FindProductService,
    },
    {
      provide: CREATE_PRODUCT_SERVICE,
      useClass: CreateProductService,
    },
    {
      provide: UPDATE_PRODUCT_SERVICE,
      useClass: UpdateProductService,
    },
    {
      provide: DELETE_PRODUCT_SERVICE,
      useClass: DeleteProductService,
    },
    // Providers para capacidades de productos
    {
      provide: FIND_ALL_PRODUCT_CAPACITY_SERVICE,
      useClass: FindAllProductCapacityService,
    },
    {
      provide: FIND_PRODUCT_CAPACITY_SERVICE,
      useClass: FindProductCapacityService,
    },
    {
      provide: CREATE_PRODUCT_CAPACITY_SERVICE,
      useClass: CreateProductCapacityService,
    },
    {
      provide: UPDATE_PRODUCT_CAPACITY_SERVICE,
      useClass: UpdateProductCapacityService,
    },
    {
      provide: DELETE_PRODUCT_CAPACITY_SERVICE,
      useClass: DeleteProductCapacityService,
    },
    // Providers para servicios IOT
    {
      provide: FIND_ALL_PRODUCTS_AFTER_LAST_SERVICE,
      useClass: FindAllProductsAfterLastService,
    },
    {
      provide: FIND_ALL_CAPACITIES_AFTER_LAST_SERVICE,
      useClass: FindAllCapacitiesAfterLastService,
    },
  ],
  controllers: [
    // Rutas relacionadas con IOT (más específicas)
    GetAllProductsAfterLastController, // GET /products/after-last
    GetAllProductCapacityAfterLastController, // GET /products/capacities/after-last

    // Rutas de capacidades de productos (específicas)
    GetAllProductCapacityController, // GET /products/capacities
    GetProductCapacityController, // GET /products/capacities/:id
    PostProductCapacityController, // POST /products/capacities
    PutProductCapacityController, // PUT /products/capacities/:id
    DeleteProductCapacityController, // DELETE /products/capacities/:id

    // Rutas CRUD básicas de productos (más generales)
    GetAllProductsController, // GET /products
    GetProductController, // GET /products/:id
    PostProductController, // POST /products
    PutProductController, // PUT /products/:id
    DeleteProductController, // DELETE /products/:id
  ],
})
export class ProductsModule {}
