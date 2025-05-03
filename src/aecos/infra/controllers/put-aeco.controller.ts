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
  UPDATE_AECO_SERVICE,
  type IUpdateAecoService,
} from '@aecos/domain/services/IUpdateAecoService'
import { UpdateAecoDto } from '@aecos/domain/dto/UpdateAecoDto'

@ApiTags('AECOS')
@Controller('aecos')
export class PutAecoController {
  logger = new Logger(PutAecoController.name)

  constructor(
    @Inject(UPDATE_AECO_SERVICE)
    private readonly service: IUpdateAecoService,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un dispositivo AECO' })
  @ApiParam({
    name: 'id',
    description: 'ID del dispositivo AECO',
    type: 'number',
  })
  @ApiBody({ type: UpdateAecoDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dispositivo AECO actualizado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dispositivo AECO no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async updateAeco(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAecoDto,
  ) {
    return await this.service.run(id, payload)
  }
}
