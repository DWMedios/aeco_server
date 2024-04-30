import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Base } from './Base';
import { Company } from './Company.entity';

@Entity({ name: 'company_settings' })
export class Setting extends Base {
  @Column({ length: 100 })
  logoUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  colors: Record<string, any>[];

  @Column()
  companyId: number;

  @OneToOne(() => Company, (company) => company.settings)
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
