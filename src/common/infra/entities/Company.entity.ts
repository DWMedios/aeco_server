import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  OneToMany,
} from 'typeorm'
import { Base } from './Base'
import { User } from './User.entity'
import { Aeco } from './Aeco.entity'
import { Promotion } from './Promotion.entity'
import { Setting } from './CompanySettings.entity'
import { UserCompanyPermissions } from './Permission.entity'
import type { ICompany } from '../../domain/entities/ICompany'

@Entity({ name: 'companies' })
export class Company extends Base implements ICompany {
  @Column({ length: 100, unique: true })
  name: string

  @Column({ length: 13, unique: true })
  rfc: string

  @ManyToMany(() => User, (user) => user.companies)
  @JoinTable({ name: 'companies_users' })
  users: User[]

  @OneToOne(() => Setting, (setting) => setting.company)
  settings: Setting

  @OneToMany(
    () => UserCompanyPermissions,
    (userCompanyPermissions) => userCompanyPermissions.company,
  )
  userCompanyPermissions: UserCompanyPermissions[]

  @OneToMany(() => Aeco, (aeco) => aeco.company)
  aecos: Aeco[]

  @OneToMany(() => Promotion, (promotion) => promotion.company)
  promotions: Promotion[]
}
