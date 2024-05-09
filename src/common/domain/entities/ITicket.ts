import type { IAeco } from './IAeco';

export interface ITicket {
  folio: string;
  method: string;
  summary: Record<string, any>;
  totalCans: number;
  totalBottles: number;
  aecoId?: number | null;
  aeco?: IAeco;
}
