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
  DELETE_AECO_SERVICE,
  type IDeleteAecoService,
} from '@aecos/domain/services/IDeleteAecoService'

@ApiTags('AECOS')
@Controller('aecos')
export class DeleteAecoController {
  logger = new Logger(DeleteAecoController.name)

  constructor(
    @Inject(DELETE_AECO_SERVICE)
    private readonly service: IDeleteAecoService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un dispositivo AECO' })
  @ApiParam({
    name: 'id',
    description: 'ID del dispositivo AECO',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dispositivo AECO eliminado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dispositivo AECO no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async deleteAeco(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
