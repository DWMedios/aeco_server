import type { UploadUrlDto } from '../../../upload/domain/dto/UploadUrlDto'

export const S3_SERVICES = Symbol('IS3Service')

export interface IS3Service {
  generatePresignedUploadUrl(uploadtUrl: UploadUrlDto): Promise<string>
  getPresignedUrl(key: string): Promise<string>
  deleteFile(key: string): Promise<boolean>
  fileExist(key: string): Promise<boolean>
  getFileUrlIfExists(key: string): Promise<string | null>
}
