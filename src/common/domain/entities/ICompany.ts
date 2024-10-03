import type { IAeco } from './IAeco';
import type { ISetting } from './ICompanySetting';
import type { IUserCompanyPermissions } from './IPermission';
import type { IPromotion } from './IPromotion';
import type { IUser } from './IUser';

export interface ICompany {
  id?: number;
  name: string;
  rfc: string;
  users: IUser[];
  settings: ISetting;
  userCompanyPermissions: IUserCompanyPermissions[];
  aecos: IAeco[];
  promotions: IPromotion[];
}
