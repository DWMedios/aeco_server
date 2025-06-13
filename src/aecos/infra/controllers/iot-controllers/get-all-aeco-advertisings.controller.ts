import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  UseGuards,
} from '@nestjs/common'
import {
  GET_ALL_AECO_ADVERTISINGS_SERVICE,
  type IGetAllAecoAdvertisingsService,
} from '@aecos/domain/services/iot-services/IGetAllAecoAdvertisingsService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import { DecodedAeco } from '@shared/domain/Types'
import { CurrentAeco } from '@shared/app/decorators/current-logged.decorator'
import type { IAeco } from '@common/domain/entities'

@ApiTags('AECOS - IoT')
@Controller('aecos')
export class GetAllAecoAdvertisingsController {
  logger = new Logger(GetAllAecoAdvertisingsController.name)

  constructor(
    @Inject(GET_ALL_AECO_ADVERTISINGS_SERVICE)
    private readonly service: IGetAllAecoAdvertisingsService,
  ) {}

  @Get('advertisings')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener publicidades disponibles para un dispositivo AECO',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Publicidades obtenidas exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Dispositivo AECO no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async getAllAecoAdvertisings(
    @CurrentAeco() aeco: DecodedAeco,
  ): Promise<IAeco> {
    return await this.service.run(aeco)
  }
}
