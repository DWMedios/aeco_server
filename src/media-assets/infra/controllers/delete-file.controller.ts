import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ValidationPipe,
} from '@nestjs/common'
import {
  DELETE_FILE_SERVICE,
  type IDeleteFileService,
} from '@media-assets/domain/services/IDeleteFileService'
import { GetDownloadUrlDto } from '@media-assets/domain/dto/GetDownloadUrl.dto'

@Controller('media-assets')
export class DeleteFileController {
  logger = new Logger(DeleteFileController.name)

  constructor(
    @Inject(DELETE_FILE_SERVICE)
    private readonly service: IDeleteFileService,
  ) {}

  @Delete(':key')
  @HttpCode(HttpStatus.OK)
  async deleteFile(
    @Param(new ValidationPipe({ transform: true })) param: GetDownloadUrlDto,
  ) {
    return await this.service.run(param.key)
  }
}
