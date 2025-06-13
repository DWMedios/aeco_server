import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import type { ICompany } from '@common/domain/entities'
import type { IFindCompanyService } from '@company/domain/services/IFindCompanyService'

@Injectable()
export class FindCompanyService implements IFindCompanyService {
  logger = new Logger(FindCompanyService.name)

  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async run(id: number): Promise<ICompany & { logoUrl?: string }> {
    const company = await this.companyRepository.findById(id)

    if (!company) throw new NotFoundException('La empresa no existe')

    let logoUrl: string | null = null
    if (company.logoId) {
      const mediaAsset = company.mediaAsset
      const s3Key = `dw/${decodeURIComponent(mediaAsset.fileKey)}`
      const fileExists = await this.s3Service.fileExist(s3Key)
      if (fileExists) {
        logoUrl = await this.s3Service.getPresignedUrl(s3Key)
      }
    }

    return {
      ...company,
      logoUrl,
    }
  }
}
