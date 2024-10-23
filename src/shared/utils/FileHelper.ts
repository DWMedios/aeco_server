import { IS3Service } from '@shared/domain/services/IS3Service'

export async function getFileUrlIfExists(
  s3Service: IS3Service,
  key: string | undefined,
): Promise<string | null> {
  if (!key) {
    return null
  }

  const fileExists = await s3Service.fileExist({ key })
  if (fileExists.status === 200) {
    return await s3Service.getPresignedViewUrl({ key })
  }

  return null
}
