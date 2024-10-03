import { PresignedGetUrlDto } from '../../../dms/domain/dtos/PresignedGetUrlDto';
import { PresignedUploadUrlDto } from '../../../dms/domain/dtos/PresignedUploadUrlDto';

export const DMS_REPOSITORY = Symbol('IDmsRepository');

export interface IDmsRepository {
  generatePresignedUploadUrl(
    presignedUploadUrl: PresignedUploadUrlDto,
  ): Promise<any>;
  generatePresignedGetUrl(presignedgetUrl: PresignedGetUrlDto): Promise<any>;
  delete(deleteFile: string): Promise<any>;
}
