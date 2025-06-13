import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import {
  FIND_ADVERTISING_SERVICE,
  type IFindAdvertisingService,
} from '@advertisings/domain/services/advertisings/IFindAdvertisingService'

@ApiTags('Publicidad')
@Controller('advertisings')
export class GetAdvertisingController {
  logger = new Logger(GetAdvertisingController.name)

  constructor(
    @Inject(FIND_ADVERTISING_SERVICE)
    private readonly service: IFindAdvertisingService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un anuncio publicitario por su ID' })
  @ApiParam({ name: 'id', description: 'ID del anuncio', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Anuncio encontrado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Anuncio no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID de anuncio inválido',
  })
  async getAdvertising(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
