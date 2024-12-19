import type { IUploadUrl } from '../S3Type'

export const S3_SERVICES = Symbol('IS3Service')

export interface IS3Service {
  generatePresignedUploadUrl(uploadtUrl: IUploadUrl): Promise<string>
  getPresignedUrl(key: string): Promise<string>
  deleteFile(key: string): Promise<boolean>
  fileExist(key: string): Promise<boolean>
  getFileUrlIfExists(key: string): Promise<string | null>
}
