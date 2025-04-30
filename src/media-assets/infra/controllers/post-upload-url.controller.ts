import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common'
import {
  CREATE_UPLOAD_URL_SERVICE,
  type ICreateUploadUrlService,
} from '@media-assets/domain/services/ICreateUploadUrlService'
import { DecodedUser } from '@shared/domain/Types'
import { CurrentUser } from '@shared/app/decorators/current-logged.decorator'
import type { CreateUploadUrlResponse } from '@media-assets/domain/Types'
import { CreateUploadUrlDto } from '@media-assets/domain/dto/CreateUploadUrl.dto'

@Controller('media-assets')
export class PostUploadUrlController {
  logger = new Logger(PostUploadUrlController.name)

  constructor(
    @Inject(CREATE_UPLOAD_URL_SERVICE)
    private readonly service: ICreateUploadUrlService,
  ) {}

  @Post('upload-url')
  @HttpCode(HttpStatus.CREATED)
  async createUploadUrl(
    @CurrentUser() currentUser: DecodedUser,
    @Body() payload: CreateUploadUrlDto,
  ): Promise<CreateUploadUrlResponse> {
    return await this.service.run(currentUser, payload)
  }
}
