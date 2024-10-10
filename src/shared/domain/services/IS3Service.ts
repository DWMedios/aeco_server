import { BaseUploadDto } from 'src/upload/domain/dto/BaseUploadDto'
import type { UploadUrlDto } from '../../../upload/domain/dto/UploadUrlDto'
import type { IResponseMessage, IResponseUploadUrl } from '../S3Type'

export const S3_SERVICES = Symbol('IS3Service')

export interface IS3Service {
  generatePresignedUploadUrl(
    uploadtUrl: UploadUrlDto,
  ): Promise<IResponseUploadUrl | null>
  deleteFile(data: BaseUploadDto): Promise<IResponseMessage>
  fileExist(exist: BaseUploadDto): Promise<IResponseMessage>
}
