import * as bcrypt from 'bcrypt'
import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  ManyToOne,
  JoinColumn,
  BeforeUpdate,
  OneToMany,
} from 'typeorm'
import { Base } from './Base'
import { Company } from './Company.entity'
import { MediaAsset } from './MediaAsset.entity'
import { UserInvite } from './UserInvite.entity'
import { UserRolePermissions } from './UserRolePermissions.entity'
import type { IUser } from '@common/domain/entities'

@Entity({ name: 'users' })
export class User extends Base implements IUser {
  @Column({ nullable: false, length: 100 })
  name: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ type: 'boolean', default: false })
  isVerified: boolean

  @Column({ nullable: true, length: 20 })
  phone?: string

  @Column({ nullable: true, length: 50 })
  position?: string

  @Column({ type: 'text', nullable: true, select: false })
  password?: string

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Column({ type: 'int', nullable: true })
  companyId?: number

  @Column({ type: 'int', nullable: true })
  imageId?: number

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  company?: Company

  @OneToOne(() => UserRolePermissions, (role) => role.user, { cascade: true })
  role?: UserRolePermissions

  @OneToOne(() => MediaAsset, (mediaAsset) => mediaAsset.userImage)
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
  mediaAsset?: MediaAsset

  @OneToMany(() => UserInvite, (ui) => ui.invitedBy)
  invitedUsers?: UserInvite[]

  @OneToMany(() => UserInvite, (ui) => ui.invitedUser)
  invites?: UserInvite[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
}
