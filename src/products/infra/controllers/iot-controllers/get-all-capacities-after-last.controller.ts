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
  FIND_ALL_CAPACITIES_AFTER_LAST_SERVICE,
  type IFindAllCapacitiesAfterLastService,
} from '@products/domain/services/iot-services/IFindAllCapacitiesAfterLastService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import type { IProductCapacity } from '@common/domain/entities'
import { FilterIotAfterLastDto } from '@shared/domain/dto/iot-dto/Filters-iot.dto'

@ApiTags('IoT Products')
@Controller('products/capacities')
export class GetAllProductCapacityAfterLastController {
  logger = new Logger(GetAllProductCapacityAfterLastController.name)

  constructor(
    @Inject(FIND_ALL_CAPACITIES_AFTER_LAST_SERVICE)
    private readonly service: IFindAllCapacitiesAfterLastService,
  ) {}

  @ApiOperation({
    summary:
      'Obtener capacidades de productos después de la última sincronizada',
    description:
      'Devuelve todas las capacidades de productos creadas o actualizadas después del ID especificado (para sincronización IoT)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Lista de capacidades posterior al ID especificado obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado - Requiere autenticación de dispositivo AECO',
  })
  @ApiQuery({
    name: 'lastId',
    required: true,
    type: Number,
    description: 'ID de la última capacidad de producto sincronizada',
  })
  @Get('after-last')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.OK)
  async getAllProductCapacityAfterLast(
    @Query() filters: FilterIotAfterLastDto,
  ): Promise<IProductCapacity[]> {
    return await this.service.run(filters.lastId)
  }
}
