import type { ICompany } from '@common/domain/entities'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import type { CreateCompanyDto } from '../domain/dto/CompanyDto'
import type { ICompanyService } from '../domain/ICompanyService'
import type { UpdateCompanyDto } from '../domain/dto/UpdateCompanyDto'
import {
  SETTING_REPOSITORY,
  type ISettingRepository,
} from '@shared/domain/repositories/ISettingRepository'
import { CompanySettingSerializer } from '../domain/serializers/SetingsSerializer'
import {
  S3_SERVICES,
  type IS3Service,
} from '@shared/domain/services/IS3Service'
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

    return await this.companyRepository.find(id)
  }

  async create(newCompany: CreateCompanyDto): Promise<ICompany> {
    const exists = await this.companyRepository.exists({
      name: newCompany.name,
    })

    if (exists) throw new BadRequestException('Company already exists')

    return await this.companyRepository.create(newCompany)
  }

  async createWithSettings(company: CreateCompanyDto): Promise<ICompany> {
    const exists = await this.companyRepository.exists({
      name: company.name,
    })

    if (exists) throw new BadRequestException('Company already exists')

    const created = await this.companyRepository.createWithSettings(company)

    let viewfile = null
    if (created.settings?.key) {
      let fileexist = await this.s3Service.fileExist({
        key: created.settings.key,
      })

      if (fileexist.status !== 200) {
        await this.settingRepository.update({ key: null }, created.settings.id)
        fileexist = null
      } else {
        viewfile = await this.s3Service.getPresignedViewUrl({
          key: created.settings.key,
        })
      }
    }
    return CompanySerializer.fromCompanyWithSettings(created, viewfile)
  }

  async update(
    company: UpdateCompanyDto,
    id: number,
  ): Promise<Partial<ICompany>> {
    const exists = await this.companyRepository.exists({
      id,
    })
    if (!exists) throw new BadRequestException('Company not found')

    return await this.companyRepository.update(company, id)
  }

  async updateWithSettings(
    company: UpdateCompanyDto,
    id: number,
  ): Promise<ICompany> {
    const exists = await this.companyRepository.find(id)

    if (!exists) throw new BadRequestException('Company not found')

    const updated = await this.companyRepository.updateWithSettings(
      exists,
      company,
    )

    let viewfile = null
    if (updated.settings?.key) {
      let fileexist = await this.s3Service.fileExist({
        key: updated.settings.key,
      })

      if (fileexist.status !== 200) {
        await this.settingRepository.update({ key: null }, updated.settings.id)
        fileexist = null
      } else {
        viewfile = await this.s3Service.getPresignedViewUrl({
          key: updated.settings.key,
        })
      }
    }
    return CompanySerializer.fromCompanyWithSettings(updated, viewfile)
  }

  async delete(id: number): Promise<any> {
    const exists = await this.companyRepository.exists({
      id,
    })
    if (!exists) throw new BadRequestException('Company not found')

    return await this.companyRepository.delete(id)
  }

  async settings(companyId: number): Promise<any> {
    const exists = await this.settingRepository.exists(companyId)

    if (!exists) throw new BadRequestException('Settings not found')

    const setting = await this.settingRepository.find(companyId)
    if (setting && setting.key) {
      let fileexist = await this.s3Service.fileExist({ key: setting.key })

      if (fileexist.status !== 200) {
        await this.settingRepository.update({ key: null }, setting.id)
        fileexist = null
      }

      const viewfile = await this.s3Service.getPresignedViewUrl({
        key: setting.key,
      })

      const settingsResponse = CompanySettingSerializer.fromCompanySetting(
        setting,
        null,
      )
      return settingsResponse
    }
  }
}
