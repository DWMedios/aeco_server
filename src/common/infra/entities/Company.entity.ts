import { Entity, Column, OneToOne, OneToMany } from 'typeorm'
import { Base } from './Base'
import { User } from './User.entity'
import { Aeco } from './Aeco.entity'
import { Promotion } from './Promotion.entity'
import { Setting } from './CompanySettings.entity'
import type {
  ICompany,
  ILegalRepresentative,
} from '../../domain/entities/ICompany'

@Entity({ name: 'companies' })
export class Company extends Base implements ICompany {
  @Column({ length: 100, unique: true })
  name: string

  @Column({ length: 13, unique: true })
  rfc: string

  @Column({ nullable: true, length: 100 })
  state?: string

  @Column({ nullable: true, length: 100 })
  city?: string

  @Column({ type: 'text', nullable: true })
  address?: string

  @Column({ nullable: true, length: 10 })
  postalCode?: string

  @Column({ nullable: true, length: 20 })
  phone?: string

  @Column({ type: 'jsonb', nullable: true })
  legalRepresentative?: ILegalRepresentative

  @Column({ type: 'boolean', default: true })
  status: boolean

  @OneToMany(() => User, (user) => user.company)
  users?: User[]

  @OneToOne(() => Setting, (setting) => setting.company, { cascade: true })
  settings?: Setting

  @OneToMany(() => Aeco, (aeco) => aeco.company)
  aecos?: Aeco[]

  @OneToMany(() => Promotion, (promotion) => promotion.company)
  promotions?: Promotion[]
}
