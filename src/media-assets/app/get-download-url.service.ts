import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { type IS3Service, S3_SERVICE } from '@shared/domain/services/IS3Service'
import type { IGetDownloadUrlService } from '@media-assets/domain/services/IGetDownloadUrlService'

@Injectable()
export class GetDownloadUrlService implements IGetDownloadUrlService {
  logger = new Logger(GetDownloadUrlService.name)

  constructor(
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(fileKey: string): Promise<{ url: string }> {
    const s3Key = `dw/image/${fileKey}`
    const fileExists = await this.s3Service.fileExist(s3Key)
    if (!fileExists) {
      throw new BadRequestException('El archivo no existe')
    }

    try {
      const url = await this.s3Service.getPresignedUrl(s3Key)
      return { url }
    } catch (error) {
      this.logger.error('Error generating download URL', error)
      throw new InternalServerErrorException(
        'Error al generar la URL de descarga',
      )
    }
  }
}
