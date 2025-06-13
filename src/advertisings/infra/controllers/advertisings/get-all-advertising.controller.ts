import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
} from '@nestjs/common'
import {
  FIND_ALL_ADVERTISING_SERVICE,
  type IFindAllAdvertisingService,
} from '@advertisings/domain/services/advertisings/IFindAllAdvertisingService'
import { FilterAdvertisingDto } from '@advertisings/domain/dto/Filters.dto'

@ApiTags('Publicidad')
@Controller('advertisings')
export class GetAllAdvertisingController {
  logger = new Logger(GetAllAdvertisingController.name)

  constructor(
    @Inject(FIND_ALL_ADVERTISING_SERVICE)
    private readonly service: IFindAllAdvertisingService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener lista de anuncios publicitarios' })
  @ApiQuery({
    name: 'companyName',
    required: false,
    description: 'Filtrar por nombre de compañía',
    type: String,
  })
  @ApiQuery({
    name: 'isEnabled',
    required: false,
    description: 'Filtrar por estado activo/inactivo',
    type: Boolean,
  })
  @ApiQuery({
    name: 'orderByField',
    required: false,
    description: 'Campo por el cual ordenar',
    enum: ['createdAt', 'id', 'companyName', 'isEnabled'],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Límite de resultados por página',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de anuncios recuperada exitosamente',
  })
  async getAllAdvertising(@Query() filters: FilterAdvertisingDto) {
    return await this.service.run(filters)
  }
}
