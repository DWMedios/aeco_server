import type { ICompany } from '../../../common/domain/entities/ICompany';
import type { CreateCompanyDto } from '../../../company/domain/dto/CompanyDto';

export const COMPANY_REPOSITORY = Symbol('ICompanyRepository');

export interface ICompanyRepository {
  exists(filter: { id?: number; name?: string }): Promise<boolean>;
  create(createCompany: CreateCompanyDto): Promise<ICompany>;
}
