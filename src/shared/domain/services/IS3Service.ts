import type { UploadUrlDto } from '../../../upload/domain/dto/UploadUrlDto'
import type { IBaseS3, IResponseUploadUrl } from '../S3Type'

export const S3_SERVICES = Symbol('IS3Service')

export interface IS3Service {
  generatePresignedUploadUrl(
    uploadtUrl: UploadUrlDto,
  ): Promise<IResponseUploadUrl | null>
  deleteFile(data: IBaseS3): Promise<IResponseUploadUrl | null>
}
