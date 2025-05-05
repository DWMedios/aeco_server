import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import {
  GET_DOWNLOAD_URL_SERVICE,
  type IGetDownloadUrlService,
} from '@media-assets/domain/services/IGetDownloadUrlService'
import { GetDownloadUrlDto } from '@media-assets/domain/dto/GetDownloadUrl.dto'
import { GetDownloadUrlResponseDto } from '@media-assets/domain/dto/GetDownloadUrlResponse.dto'
import { AecosGuard } from '@shared/app/guards/aecos.guard'

@ApiTags('Media Assets')
@Controller('media-assets')
export class GetDownloadUrlAecoController {
  logger = new Logger(GetDownloadUrlAecoController.name)

  constructor(
    @Inject(GET_DOWNLOAD_URL_SERVICE)
    private readonly service: IGetDownloadUrlService,
  ) {}

  @Get('aecos/download-url/:key')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtiene una URL temporal para descargar un archivo multimedia',
  })
  @ApiParam({
    name: 'key',
    description: 'Clave única que identifica el archivo a descargar',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: 'URL de descarga generada correctamente',
    type: GetDownloadUrlResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'El archivo no fue encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado para acceder al archivo',
  })
  async getDownloadUrlAeco(
    @Param(new ValidationPipe({ transform: true })) param: GetDownloadUrlDto,
  ): Promise<{ url: string }> {
    return await this.service.run(param.key)
  }
}
