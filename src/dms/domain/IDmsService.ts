import type { PresignedGetUrlDto } from './dtos/PresignedGetUrlDto';
import type { PresignedUploadUrlDto } from './dtos/PresignedUploadUrlDto';

export const DMS_SERVICE = Symbol('IDmsService');

export interface IDmsService {
  presignedUploadUrl(presignedUploadUrl: PresignedUploadUrlDto): Promise<any>;
  presignedGetUrl(presignedGetUrl: PresignedGetUrlDto): Promise<any>;
}
