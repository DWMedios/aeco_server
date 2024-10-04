import { Controller, Delete, Get, Inject, Param, Query } from '@nestjs/common'
import { DeleteFileDto } from '../domain/dtos/DeleteFileDto'
import { PresignedGetUrlDto } from '../domain/dtos/PresignedGetUrlDto'
import { PresignedUploadUrlDto } from '../domain/dtos/PresignedUploadUrlDto'
import { DMS_SERVICE, type IDmsService } from '../domain/IDmsService'

@Controller('dms')
export class DmsController {
  constructor(
    @Inject(DMS_SERVICE)
    private readonly dmsService: IDmsService,
  ) {}

  @Get('/presigned-upload-url')
  async generatePresignedUrl(@Query() query: PresignedUploadUrlDto) {
    const presignedUrl = await this.dmsService.presignedUploadUrl(query)

    return presignedUrl
  }

  @Get('/presigned-get-url')
  async getPresignedGetUrl(@Query() query: PresignedGetUrlDto) {
    const url = await this.dmsService.presignedGetUrl(query)
    return { url }
  }

  @Delete(':key')
  async deleteFile(@Param() { key }: DeleteFileDto) {
    return this.dmsService.delete(key)
  }

  // @Post('/file')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
  //         new MaxFileSizeValidator({
  //           maxSize: 10 * 1024 * 1024, // 10MB
  //           message: 'File is too large. Max file size is 10MB',
  //         }),
  //       ],
  //       fileIsRequired: true,
  //     }),
  //   )
  //   file: Express.Multer.File,
  //   @Body('isPublic') isPublic: string,
  // ) {
  //   const isPublicBool = isPublic === 'true' ? true : false;
  //   return this.dmsService.uploadSingleFile({ file, isPublic: isPublicBool });
  // }

  // @Get('/url-image/:key')
  // async getFileUrl(@Param('key') key: string) {
  //   return this.dmsService.getFileUrl(key);
  // }

  // @Get('/signed-url/:key')
  // async getSingedUrl(@Param('key') key: string) {
  //   return this.dmsService.getPresignedSignedUrl(key);
  // }
}
