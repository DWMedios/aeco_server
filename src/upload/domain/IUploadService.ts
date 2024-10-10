import type {
  IResponseMessage,
  IResponseUploadUrl,
} from '@shared/domain/S3Type'
import type { UploadUrlDto } from './dto/UploadUrlDto'
import { BaseUploadDto } from './dto/BaseUploadDto'

export const UPLOAD_SERVICE = Symbol('IUploadService')

export interface IUploadService {
  uploadUrl(uploadUrl: UploadUrlDto): Promise<IResponseUploadUrl>
  delete(data: BaseUploadDto): Promise<IResponseMessage>
}
