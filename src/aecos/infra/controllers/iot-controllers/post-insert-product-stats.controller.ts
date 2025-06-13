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
  INSERT_PRODUCT_STATS_AECO_SERVICE,
  type IInsertProductStatsAecoService,
} from '@aecos/domain/services/iot-services/IInsertProductStatsAecoService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import { DecodedAeco } from '@shared/domain/Types'
import { CurrentAeco } from '@shared/app/decorators/current-logged.decorator'
import { RequestProductStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'

@ApiTags('AECOS - IoT')
@Controller('aecos')
export class PostInsertProductStatsController {
  logger = new Logger(PostInsertProductStatsController.name)

  constructor(
    @Inject(INSERT_PRODUCT_STATS_AECO_SERVICE)
    private readonly service: IInsertProductStatsAecoService,
  ) {}

  @Post('upload-product-stats')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Subir estadísticas de productos de un dispositivo AECO',
  })
  @ApiBody({ type: RequestProductStatsDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Estadísticas de productos guardadas exitosamente',
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
    description: 'Error al guardar las estadísticas de productos',
  })
  async insertProductStats(
    @CurrentAeco() aeco: DecodedAeco,
    @Body() payload: RequestProductStatsDto,
  ) {
    return await this.service.run(aeco, payload)
  }
}
