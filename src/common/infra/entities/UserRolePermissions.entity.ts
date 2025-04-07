import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Base } from './Base'
import { User } from './User.entity'
import { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'
import type { IUserRolePermissions } from '@common/domain/entities'

@Entity({ name: 'user_role_permissions' })
export class UserRolePermissions extends Base implements IUserRolePermissions {
  @Column({ type: 'jsonb', nullable: true })
  permissions: Record<string, boolean>[]

  @Column({ type: 'enum', enum: UserRoleEntiyEnum })
  role: UserRoleEntiyEnum

  @Column({ type: 'text', nullable: true })
  apiKey: string

  @Column({ type: 'text', nullable: true })
  token: string

  @Column({ type: 'int' })
  userId: number

  @OneToOne(() => User, (user) => user.role)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User
}
