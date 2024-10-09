import type { IBaseS3 } from '@shared/domain/S3Type'
import type { UploadUrlDto } from './dto/UploadUrlDto'

export const UPLOAD_SERVICE = Symbol('IUploadService')

export interface IUploadService {
  uploadUrl(uploadUrl: UploadUrlDto): Promise<any>
  delete(data: IBaseS3): Promise<any>
}
