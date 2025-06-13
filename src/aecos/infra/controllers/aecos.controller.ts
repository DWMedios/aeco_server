import { Controller, Get, Inject, Logger, Param, Patch } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  AECO_SERVICE,
  type IAecoService,
} from '@aecos/domain/services/IAecoService'
import { FinishSetupDto } from '@aecos/domain/dto/FinishSetupDto'

@ApiTags('AECOS')
@Controller('aecos')
export class AecosController {
  logger = new Logger(AecosController.name)

  constructor(
    @Inject(AECO_SERVICE)
    private readonly aecoService: IAecoService,
  ) {}

  @Get('initial-setup/:serialNumber')
  @ApiOperation({
    summary: 'Obtener configuración inicial de un dispositivo AECO',
  })
  @ApiParam({
    name: 'serialNumber',
    description: 'Número de serie del dispositivo AECO',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Configuración inicial obtenida exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Dispositivo AECO no encontrado',
  })
  async getInitialSetup(@Param('serialNumber') serialNumber: string) {
    return await this.aecoService.getInitialSetup(serialNumber)
  }

  @Patch('finish-setup/:type/:serialNumber')
  @ApiOperation({ summary: 'Finalizar configuración de un dispositivo AECO' })
  @ApiParam({
    name: 'type',
    description: 'Tipo de finalización de configuración (INIT/UPDATE)',
    type: 'string',
  })
  @ApiParam({
    name: 'serialNumber',
    description: 'Número de serie del dispositivo AECO',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Configuración finalizada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Dispositivo AECO no encontrado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al finalizar la configuración',
  })
  async finishSetup(@Param() params: FinishSetupDto) {
    return await this.aecoService.finishSetup(params)
  }
}
