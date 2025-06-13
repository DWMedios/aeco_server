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
  FIND_AECO_SERVICE,
  type IFindAecoService,
} from '@aecos/domain/services/IFindAecoService'

@ApiTags('AECOS')
@Controller('aecos')
export class GetAecoController {
  logger = new Logger(GetAecoController.name)

  constructor(
    @Inject(FIND_AECO_SERVICE)
    private readonly service: IFindAecoService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un dispositivo AECO por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del dispositivo AECO',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dispositivo AECO encontrado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dispositivo AECO no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async getOneAeco(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
