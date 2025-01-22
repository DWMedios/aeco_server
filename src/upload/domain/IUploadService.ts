import type { UploadUrlDto } from './dto/UploadUrlDto'
import type { BaseUploadDto } from './dto/BaseUploadDto'

export const UPLOAD_SERVICE = Symbol('IUploadService')

export interface IUploadService {
  uploadUrl(uploadUrl: UploadUrlDto): Promise<string>
  delete(data: BaseUploadDto): Promise<boolean>
}
