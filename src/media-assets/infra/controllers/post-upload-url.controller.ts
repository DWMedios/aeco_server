import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger'
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
import { CreateUploadUrlResponseDto } from '@media-assets/domain/dto/CreateUploadUrlResponse.dto'

@ApiTags('Media Assets')
@Controller('media-assets')
export class PostUploadUrlController {
  logger = new Logger(PostUploadUrlController.name)

  constructor(
    @Inject(CREATE_UPLOAD_URL_SERVICE)
    private readonly service: ICreateUploadUrlService,
  ) {}

  @Post('upload-url')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Genera una URL temporal para subir un archivo multimedia',
  })
  @ApiBody({
    type: CreateUploadUrlDto,
    description: 'Información necesaria para generar la URL de subida',
  })
  @ApiCreatedResponse({
    description: 'URL de subida generada correctamente',
    type: CreateUploadUrlResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuario no autenticado o sin permisos para esta acción',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de solicitud inválidos o incompletos',
  })
  async createUploadUrl(
    @CurrentUser() currentUser: DecodedUser,
    @Body() payload: CreateUploadUrlDto,
  ): Promise<CreateUploadUrlResponse> {
    return await this.service.run(currentUser, payload)
  }
}
