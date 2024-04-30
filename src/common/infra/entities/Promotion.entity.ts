import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Base } from './Base';
import { Aeco } from './Aeco.entity';
import { Company } from './Company.entity';

@Entity('promotions')
export class Promotion extends Base {
  @Column({ default: 0 })
  order: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  description: string;

  @Column({ default: 0 })
  changeQty: number;

  @Column({ length: 100 })
  logoUrl: string;

  @Column({ default: false })
  isEnabled: boolean;

  @Column({ nullable: true })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.promotions)
  company: Company;

  @ManyToMany(() => Aeco)
  @JoinTable({ name: 'promotions_aecos' })
  aecosDenied: Aeco[];
}
