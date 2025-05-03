import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common'
import {
  UPDATE_ADVERTISING_SERVICE,
  type IUpdateAdvertisingService,
} from '@advertisings/domain/services/advertisings/IUpdateAdvertisingService'
import { UpdateAdvertisingDto } from '@advertisings/domain/dto/advertisings/UpdateAdvertising.dto'

@ApiTags('Publicidad')
@Controller('advertisings')
export class PutAdvertisingController {
  logger = new Logger(PutAdvertisingController.name)

  constructor(
    @Inject(UPDATE_ADVERTISING_SERVICE)
    private readonly service: IUpdateAdvertisingService,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un anuncio publicitario existente' })
  @ApiParam({ name: 'id', description: 'ID del anuncio', type: 'number' })
  @ApiBody({
    type: UpdateAdvertisingDto,
    description: 'Datos para actualizar el anuncio',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Anuncio actualizado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Anuncio no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  async updateAdvertising(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAdvertisingDto,
  ) {
    return await this.service.run(id, payload)
  }
}
