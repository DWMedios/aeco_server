import { Injectable, Inject, Logger, BadRequestException } from '@nestjs/common'
import { type IS3Service, S3_SERVICE } from '@shared/domain/services/IS3Service'
import type { IDeleteFileService } from '@media-assets/domain/services/IDeleteFileService'

@Injectable()
export class DeleteFileService implements IDeleteFileService {
  logger = new Logger(DeleteFileService.name)
  constructor(
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(fileKey: string): Promise<{ success: boolean }> {
    const s3Key = `dw/${decodeURIComponent(fileKey)}`
    const fileExists = await this.s3Service.fileExist(s3Key)

    if (!fileExists) {
      this.logger.error(`File ${fileKey} does not exist in S3`)
      throw new BadRequestException('El archivo no existe')
    }

    try {
      const filedeleted = await this.s3Service.deleteFile(s3Key)

      return { success: filedeleted }
    } catch (error) {
      this.logger.error('Error deleting file from S3', error)
      throw new BadRequestException('Error al eliminar el archivo de S3')
    }
  }
}
