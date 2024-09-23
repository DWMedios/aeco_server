import type { IAeco } from './IAeco';
import type { IRewardCategory } from './IRewardCategory';

export interface IReward {
  name: string;
  icon: string;
  order: number;
  status: number;
  aecoId: number;
  aeco: IAeco;
  categoryId: number;
  category: IRewardCategory;
}
