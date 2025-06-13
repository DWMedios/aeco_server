import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { type IS3Service, S3_SERVICE } from '@shared/domain/services/IS3Service'
import {
  ASSET_TYPE_RULES,
  EXTENSION_TO_MIME_TYPE,
} from '@shared/utils/constants'
import { clearFileName, generateFileKey } from '@shared/utils/functions'
import type { DecodedUser } from '@shared/domain/Types'
import type { CreateUploadUrlDto } from '@media-assets/domain/dto/CreateUploadUrl.dto'
import type { CreateUploadUrlResponse } from '@media-assets/domain/Types'
import type { ICreateUploadUrlService } from '@media-assets/domain/services/ICreateUploadUrlService'

@Injectable()
export class CreateUploadUrlService implements ICreateUploadUrlService {
  logger = new Logger(CreateUploadUrlService.name)

  constructor(
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(
    currentUser: DecodedUser,
    request: CreateUploadUrlDto,
  ): Promise<CreateUploadUrlResponse> {
    const { fileName, mimeType, assetType, fileExtension } = request

    const rules = ASSET_TYPE_RULES[assetType]
    if (!rules) {
      throw new BadRequestException('Tipo de asset no válido')
    }

    if (!rules.allowedMimeTypes.includes(mimeType)) {
      throw new BadRequestException(
        `El tipo MIME '${mimeType}' no es válido para '${assetType}'`,
      )
    }

    if (!rules.allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        `La extensión '${fileExtension}' no es válida para '${assetType}'`,
      )
    }

    const expectedMimeType = EXTENSION_TO_MIME_TYPE[fileExtension]
    if (expectedMimeType !== mimeType) {
      throw new BadRequestException(
        `La extensión '${fileExtension}' no coincide con el tipo MIME '${mimeType}'`,
      )
    }

    const fileNameCleaned = clearFileName(fileName)
    const fileKey = generateFileKey(fileNameCleaned, fileExtension)
    const s3Key = `dw/${assetType}/${fileKey}`
    const fileMetadata: Record<string, string> = {
      user_name: currentUser.username,
      user_id: String(currentUser.userId),
      user_email: currentUser.email,
      user_role: currentUser.roleType,
      user_company: currentUser.company?.name ?? 'null',
      file_original_name: fileName,
      file_type: assetType,
      'Content-Type': mimeType,
    }

    const response = await this.s3Service.getPresignedUploadUrl(
      s3Key,
      mimeType,
      fileNameCleaned,
      fileMetadata,
    )

    if (!response) {
      this.logger.error('Error generating presigned upload URL')
      throw new InternalServerErrorException(
        'Error al generar la URL de carga firmada',
      )
    }

    return {
      key: encodeURIComponent(`${assetType}/${fileKey}`),
      ...response,
    }
  }
}
