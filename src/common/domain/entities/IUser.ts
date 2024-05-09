import type { ICompany } from './ICompany';
import type { IUserCompanyPermissions } from './IPermission';

export interface IUser {
  name: string;
  email: string;
  phone?: string;
  position?: string;
  photoUrl?: string | null;
  gender?: string;
  password?: string;
  companyId?: number;
  companies: ICompany[];
  userCompanyPermissions: IUserCompanyPermissions[];
}
