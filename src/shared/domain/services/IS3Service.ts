import { UploadUrlDto } from 'src/upload/domain/dto/PresignedUploadUrlDto'
import { IResponseUploadUrl } from '../S3Type'

export const S3_SERVICES = Symbol('IS3Service')

export interface IS3Service {
  generatePresignedUploadUrl(
    uploadtUrl: UploadUrlDto,
  ): Promise<IResponseUploadUrl | null>
  deleteFile(deleteFile: string): Promise<IResponseUploadUrl | null>
}
