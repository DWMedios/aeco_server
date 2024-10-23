import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import type { ICompany } from '@common/domain/entities'
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import { getFileUrlIfExists } from '@shared/utils/FileHelper'
import {
  SETTING_REPOSITORY,
  type ISettingRepository,
} from '@shared/domain/repositories/ISettingRepository'
import {
  S3_SERVICES,
  type IS3Service,
} from '@shared/domain/services/IS3Service'
import type { ICompanyService } from '../domain/ICompanyService'
import type { UpdateCompanyDto } from '../domain/dto/UpdateCompanyDto'
import type { CreateCompanyDto } from '../domain/dto/CompanyDto'
import { CompanySerializer } from '../domain/serializers/CompanySerializer'

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
    @Inject(SETTING_REPOSITORY)
    private readonly settingRepository: ISettingRepository,
    @Inject(S3_SERVICES)
    private readonly s3Service: IS3Service,
  ) {}

  async find(id: number): Promise<Partial<ICompany>> {
    const exists = await this.companyRepository.exists({
      id: id,
    })
    if (!exists) throw new BadRequestException('Company not found')

    const company = await this.companyRepository.find(id)

    const fileUrl = await getFileUrlIfExists(
      this.s3Service,
      company.settings?.key,
    )

    return CompanySerializer.fromCompanyWithSettings(company, fileUrl)
  }

  async create(newCompany: CreateCompanyDto): Promise<ICompany> {
    const exists = await this.companyRepository.exists({
      name: newCompany.name,
    })
    console.log('🚀 ~ CompanyService ~ create ~ exists:', exists)

    if (exists) throw new BadRequestException('Company already exists')

    return await this.companyRepository.create(newCompany)
  }

  async createWithSettings(company: CreateCompanyDto): Promise<ICompany> {
    const exists = await this.companyRepository.exists({
      name: company.name,
    })

    if (exists) throw new BadRequestException('Company already exists')

    const fileUrl = await getFileUrlIfExists(
      this.s3Service,
      company.settings?.key,
    )

    const companyCreated =
      await this.companyRepository.createWithSettings(company)

    return CompanySerializer.fromCompanyWithSettings(companyCreated, fileUrl)
  }

  async update(
    company: UpdateCompanyDto,
    companyId: number,
  ): Promise<Partial<ICompany>> {
    const exists = await this.companyRepository.exists({
      id: companyId,
    })
    if (!exists) throw new BadRequestException('Company not found')

    return await this.companyRepository.update(company, companyId)
  }

  async updateWithSettings(
    company: UpdateCompanyDto,
    companyId: number,
  ): Promise<ICompany> {
    const exists = await this.companyRepository.find(companyId)

    if (!exists) throw new BadRequestException('Company not found')

    const fileUrl = await getFileUrlIfExists(
      this.s3Service,
      exists.settings?.key,
    )

    const companyUpdated = await this.companyRepository.updateWithSettings(
      exists,
      company,
    )
    return CompanySerializer.fromCompanyWithSettings(companyUpdated, fileUrl)
  }

  async delete(companyId: number): Promise<boolean> {
    const exists = await this.companyRepository.exists({
      id: companyId,
    })
    if (!exists) throw new BadRequestException('Company not found')

    return await this.companyRepository.delete(companyId)
  }
}
