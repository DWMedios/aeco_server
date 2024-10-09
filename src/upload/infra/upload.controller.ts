import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common'
import type { IBaseS3 } from '@shared/domain/S3Type'
import { type IUploadService, UPLOAD_SERVICE } from '../domain/IUploadService'
import type { UploadUrlDto } from '../domain/dto/UploadUrlDto'

@Controller('upload')
export class UploadController {
  constructor(
    @Inject(UPLOAD_SERVICE)
    private readonly uploadService: IUploadService,
  ) {}

  @Post('/media')
  async generatePresignedUrl(@Body() body: UploadUrlDto) {
    return await this.uploadService.uploadUrl(body)
  }

  @Delete('/:key')
  async deleteFile(@Param() params: IBaseS3) {
    return await this.uploadService.delete(params)
  }
}
