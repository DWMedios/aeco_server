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
  FIND_ALL_AECO_SERVICE,
  type IFindAllAecoService,
} from '@aecos/domain/services/IFindAllAecoService'
import { AecoFiltersDto } from '@aecos/domain/dto/Filters.dto'

@ApiTags('AECOS')
@Controller('aecos')
export class GetAllAecoController {
  logger = new Logger(GetAllAecoController.name)

  constructor(
    @Inject(FIND_ALL_AECO_SERVICE)
    private readonly service: IFindAllAecoService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todos los dispositivos AECO' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({
    name: 'perpage',
    required: false,
    description: 'Elementos por página',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Término de búsqueda',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de dispositivos AECO obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error al obtener la lista de dispositivos AECO',
  })
  async getAllAecos(@Query() filters: AecoFiltersDto) {
    return await this.service.run(filters)
  }
}
