export const S3_SERVICE = Symbol('IS3Service')

export interface IS3Service {
  getPresignedUploadUrl(
    key: string,
    fileType: string,
    fileName: string,
    metadata: Record<string, string>,
  ): Promise<{ url: string; headers: Record<string, string> } | null>
  getPresignedUrl(key: string): Promise<string | null>
  deleteFile(key: string): Promise<boolean>
  fileExist(key: string): Promise<boolean>
  getFileUrlIfExists(key: string): Promise<string | null>
}
