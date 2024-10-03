import { Inject, Injectable } from '@nestjs/common'
import {
  DMS_REPOSITORY,
  type IDmsRepository,
} from '../../shared/domain/repositories/IDmsRepository'
import { IDmsService } from '../domain/IDmsService'
import { PresignedGetUrlDto } from '../domain/dtos/PresignedGetUrlDto'
import { PresignedUploadUrlDto } from '../domain/dtos/PresignedUploadUrlDto'

@Injectable()
export class DmsService implements IDmsService {
  constructor(
    @Inject(DMS_REPOSITORY)
    private readonly dmsRepository: IDmsRepository,
  ) {}
  async presignedUploadUrl(data: PresignedUploadUrlDto): Promise<any> {
    return await this.dmsRepository.generatePresignedUploadUrl(data)
  }
  async presignedGetUrl(data: PresignedGetUrlDto): Promise<any> {
    return await this.dmsRepository.generatePresignedGetUrl(data)
  }
  async delete(data: string): Promise<any> {
    return await this.dmsRepository.delete(data)
  }
}
