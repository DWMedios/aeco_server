import { HttpStatus } from '@nestjs/common'
import type { IS3Service } from '@shared/domain/services/IS3Service'

export async function getFileUrlIfExists(
  s3Service: IS3Service,
  key?: string,
): Promise<string | null> {
  if (!key) {
    return null
  }

  const fileExists = await s3Service.fileExist({ key })
  if (fileExists.status === HttpStatus.OK) {
    return await s3Service.getPresignedViewUrl({ key })
  }

  return null
}
