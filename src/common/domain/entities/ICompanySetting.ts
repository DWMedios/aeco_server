import { ICompany } from './ICompany';

export interface ISetting {
  logoUrl: string;
  colors: Record<string, any>[];
  companyId: number;
  company: ICompany;
}
