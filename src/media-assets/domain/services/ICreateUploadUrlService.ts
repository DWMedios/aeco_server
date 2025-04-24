import type { DecodedUser } from '@shared/domain/Types'
import type { CreateUploadUrlDto } from '../dto/CreateUploadUrl.dto'
import type { CreateUploadUrlResponse } from '../Types'

export const CREATE_UPLOAD_URL_SERVICE = Symbol('ICreateUploadUrlService')

export interface ICreateUploadUrlService {
  run(
    currentUser: DecodedUser,
    request: CreateUploadUrlDto,
  ): Promise<CreateUploadUrlResponse>
}
