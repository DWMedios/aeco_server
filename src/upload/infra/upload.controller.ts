import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common'
import { type IUploadService, UPLOAD_SERVICE } from '../domain/IUploadService'
import { UploadUrlDto } from '../domain/dto/UploadUrlDto'
import { BaseUploadDto } from '../domain/dto/BaseUploadDto'

@Controller('upload')
export class UploadController {
  constructor(
    @Inject(UPLOAD_SERVICE)
    private readonly uploadService: IUploadService,
  ) {}

  @Post('media')
  async generatePresignedUrl(@Body() body: UploadUrlDto) {
    return await this.uploadService.uploadUrl(body)
  }

  @Delete(':key')
  async deleteFile(@Param() params: BaseUploadDto) {
    return await this.uploadService.delete(params)
  }
}
