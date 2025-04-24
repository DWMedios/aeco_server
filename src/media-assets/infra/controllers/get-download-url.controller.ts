import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ValidationPipe,
} from '@nestjs/common'
import {
  GET_DOWNLOAD_URL_SERVICE,
  type IGetDownloadUrlService,
} from '@media-assets/domain/services/IGetDownloadUrlService'
import { GetDownloadUrlDto } from '@media-assets/domain/dto/GetDownloadUrl.dto'

@Controller('media-assets')
export class GetDownloadUrlController {
  logger = new Logger(GetDownloadUrlController.name)

  constructor(
    @Inject(GET_DOWNLOAD_URL_SERVICE)
    private readonly service: IGetDownloadUrlService,
  ) {}

  @Get('download-url/:key')
  @HttpCode(HttpStatus.OK)
  async getDownloadUrl(
    @Param(new ValidationPipe({ transform: true })) param: GetDownloadUrlDto,
  ): Promise<{ url: string }> {
    return await this.service.run(param.key)
  }
}
