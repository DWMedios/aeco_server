import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import {
  DELETE_ADVERTISING_SERVICE,
  type IDeleteAdvertisingService,
} from '@advertisings/domain/services/advertisings/IDeleteAdvertisingService'

@ApiTags('Publicidad')
@Controller('advertisings')
export class DeleteAdvertisingController {
  logger = new Logger(DeleteAdvertisingController.name)

  constructor(
    @Inject(DELETE_ADVERTISING_SERVICE)
    private readonly service: IDeleteAdvertisingService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un anuncio publicitario' })
  @ApiParam({
    name: 'id',
    description: 'ID del anuncio a eliminar',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Anuncio eliminado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Anuncio no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID de anuncio inválido',
  })
  async deleteAdvertising(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
