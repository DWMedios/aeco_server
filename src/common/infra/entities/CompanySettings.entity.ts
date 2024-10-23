import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { Base } from './Base'
import { Company } from './Company.entity'
import type { ISetting } from '../../domain/entities/ICompanySetting'

@Entity({ name: 'company_settings' })
export class Setting extends Base implements ISetting {
  @Column({ nullable: true, length: 100 })
  key?: string

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>[]

  @Column()
  companyId: number

  @OneToOne(() => Company, (company) => company.settings)
  @JoinColumn({ name: 'companyId' })
  company: Company
}
