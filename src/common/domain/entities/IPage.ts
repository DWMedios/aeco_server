import type { IAeco } from './IAeco';

export interface IPage {
  name: string;
  metadata: Record<string, any>[];
  aecoId: number;
  aeco: IAeco;
}
