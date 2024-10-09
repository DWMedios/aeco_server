import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common'
import { type IUploadService, UPLOAD_SERVICE } from '../domain/IUploadService'
import type { UploadUrlDto } from '../domain/dto/PresignedUploadUrlDto'

@Controller('upload')
export class UploadController {
  constructor(
    @Inject(UPLOAD_SERVICE)
    private readonly uploadService: IUploadService,
  ) {}

  @Post('/presigned-upload-url')
  async generatePresignedUrl(@Body() body: UploadUrlDto) {
    return await this.uploadService.uploadUrl(body)
  }

  @Delete('delete-file/:key')
  async deleteFile(@Param('key') key: string) {
    return await this.uploadService.delete(key)
  }
}
