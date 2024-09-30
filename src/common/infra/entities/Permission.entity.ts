import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { User } from './User.entity'
import { Company } from './Company.entity'
import type { IUserCompanyPermissions } from '../../domain/entities/IPermission'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

@Entity('user_company_permissions')
export class UserCompanyPermissions
  extends Base
  implements IUserCompanyPermissions
{
  @Column('jsonb')
  permissions: Record<string, boolean>[]

  @Column('enum', { enum: UserRole })
  role: UserRole

  @Column()
  userId: number

  @Column()
  companyId: number

  @ManyToOne(() => User, (user) => user.userCompanyPermissions)
  user: User

  @ManyToOne(() => Company, (company) => company.userCompanyPermissions)
  company: Company
}
