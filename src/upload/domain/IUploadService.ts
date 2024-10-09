import type { UploadUrlDto } from './dto/PresignedUploadUrlDto'

export const UPLOAD_SERVICE = Symbol('IUploadService')

export interface IUploadService {
  uploadUrl(uploadUrl: UploadUrlDto): Promise<any>
  delete(key: string): Promise<any>
}
