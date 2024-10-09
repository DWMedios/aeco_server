import type {
  IBaseS3,
  IResponseMessage,
  IResponseUploadUrl,
} from '@shared/domain/S3Type'
import type { UploadUrlDto } from './dto/UploadUrlDto'

export const UPLOAD_SERVICE = Symbol('IUploadService')

export interface IUploadService {
  uploadUrl(uploadUrl: UploadUrlDto): Promise<IResponseUploadUrl>
  delete(data: IBaseS3): Promise<IResponseMessage>
}
