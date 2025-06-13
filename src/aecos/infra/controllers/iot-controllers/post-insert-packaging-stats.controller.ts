import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  INSERT_PACKAGING_STATS_AECO_SERVICE,
  type IInsertPackagingStatsAecoService,
} from '@aecos/domain/services/iot-services/IInsertPackagingStatsAecoService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import { DecodedAeco } from '@shared/domain/Types'
import { CurrentAeco } from '@shared/app/decorators/current-logged.decorator'
import { RequestPackagingStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'

@ApiTags('AECOS - IoT')
@Controller('aecos')
export class PostInsertPackagingStatsController {
  logger = new Logger(PostInsertPackagingStatsController.name)

  constructor(
    @Inject(INSERT_PACKAGING_STATS_AECO_SERVICE)
    private readonly service: IInsertPackagingStatsAecoService,
  ) {}

  @Post('upload-packaging-stats')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Subir estadísticas de empaquetado de un dispositivo AECO',
  })
  @ApiBody({ type: RequestPackagingStatsDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Estadísticas de empaquetado guardadas exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error al guardar las estadísticas de empaquetado',
  })
  async insertPackagingStats(
    @CurrentAeco() aeco: DecodedAeco,
    @Body() payload: RequestPackagingStatsDto,
  ) {
    return await this.service.run(aeco, payload)
  }
}
