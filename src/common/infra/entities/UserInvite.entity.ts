import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Base } from './Base'
import { User } from './User.entity'
import { UserInviteTypeEnum } from '@common/domain/enums/UserInviteType.enum'
import { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import type { IUserInvite } from '@common/domain/entities/IUserInvite'

@Entity({ name: 'user_invites' })
export class UserInvite extends Base implements IUserInvite {
  @Column({ type: 'text' })
  email: string

  @Column({ type: 'enum', enum: UserInviteTypeEnum })
  inviteType: UserInviteTypeEnum

  @Column({
    type: 'enum',
    enum: UserInviteStatusEnum,
    default: UserInviteStatusEnum.PENDING,
  })
  status: UserInviteStatusEnum

  @Column({ type: 'text' })
  token: string

  @Column({ type: 'int', nullable: true })
  invitedById?: number

  @Column({ type: 'int', nullable: true })
  invitedUserId?: number

  @ManyToOne(() => User, (user) => user.invitedUsers)
  @JoinColumn({ name: 'invitedById', referencedColumnName: 'id' })
  invitedBy?: User

  @ManyToOne(() => User, (user) => user.invites)
  @JoinColumn({ name: 'invitedUserId', referencedColumnName: 'id' })
  invitedUser?: User
}
