import type { IAeco } from './IAeco';
import type { ICompany } from './ICompany';

export interface IPromotion {
  order: number;
  name: string;
  description: string;
  changeQty: number;
  logoUrl: string;
  isEnabled: boolean;
  companyId: number;
  company: ICompany;
  aecosDenied: IAeco[];
}
