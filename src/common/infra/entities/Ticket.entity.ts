import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './Base';
import { Aeco } from './Aeco.entity';

@Entity()
export class Ticket extends Base {
  @Column({ length: 100 })
  folio: string;

  @Column({ length: 100 })
  method: string;

  @Column('jsonb')
  summary: Record<string, any>;

  @Column({ default: 0 })
  totalCans: number;

  @Column({ default: 0 })
  totalBottles: number;

  @Column({ nullable: true })
  aecoId: number;

  @ManyToOne(() => Aeco, (aeco) => aeco.tickets)
  aeco: Aeco;
}
