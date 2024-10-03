import { PresignedGetUrlDto } from 'src/dms/domain/dtos/PresignedGetUrlDto';
import { PresignedUploadUrlDto } from 'src/dms/domain/dtos/PresignedUploadUrlDto';

export const DMS_REPOSITORY = Symbol('IDmsRepository');

export interface IDmsRepository {
  generatePresignedUploadUrl(
    presignedUploadUrl: PresignedUploadUrlDto,
  ): Promise<any>;
  generatePresignedGetUrl(presignedgetUrl: PresignedGetUrlDto): Promise<any>;
}
