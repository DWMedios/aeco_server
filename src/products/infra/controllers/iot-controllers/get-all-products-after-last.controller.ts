import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  FIND_ALL_PRODUCTS_AFTER_LAST_SERVICE,
  type IFindAllProductsAfterLastService,
} from '@products/domain/services/iot-services/IFindAllProductsAfterLastService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import type { IProduct } from '@common/domain/entities'
import { FilterIotAfterLastDto } from '@shared/domain/dto/iot-dto/Filters-iot.dto'

@ApiTags('IoT Products')
@Controller('products')
export class GetAllProductsAfterLastController {
  logger = new Logger(GetAllProductsAfterLastController.name)

  constructor(
    @Inject(FIND_ALL_PRODUCTS_AFTER_LAST_SERVICE)
    private readonly service: IFindAllProductsAfterLastService,
  ) {}

  @ApiOperation({
    summary: 'Obtener productos después del último sincronizado',
    description:
      'Devuelve todos los productos creados o actualizados después del ID especificado (para sincronización IoT)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Lista de productos posterior al ID especificado obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado - Requiere autenticación de dispositivo AECO',
  })
  @ApiQuery({
    name: 'lastId',
    required: true,
    type: Number,
    description: 'ID del último producto sincronizado',
  })
  @Get('after-last')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.OK)
  async getAllProductsAfterLast(
    @Query() filters: FilterIotAfterLastDto,
  ): Promise<IProduct[]> {
    return await this.service.run(filters.lastId)
  }
}
