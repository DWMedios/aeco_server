import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserInvite } from '@common/infra/entities'
import { UserInviteTypeEnum } from '@common/domain/enums/UserInviteType.enum'
import { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import type { IUserInvite } from '@common/domain/entities/IUserInvite'
import type { IUserInviteFilters } from '@shared/domain/Filters'
import type { IUserInviteRepository } from '@shared/domain/repositories/IUserInviteRepository'
import { TransactionalRepository } from '../base/transactional.repository'

@Injectable()
export class UserInviteRepository
  extends TransactionalRepository<IUserInvite>
  implements IUserInviteRepository
{
  constructor(
    @InjectRepository(UserInvite)
    readonly entityRepository: Repository<IUserInvite>,
  ) {
    super(entityRepository)
  }

  findById(id: number, manager?: EntityManager): Promise<IUserInvite | null> {
    return this.repository(manager).findOne({
      where: { id },
    })
  }

  findBy(
    filters: IUserInviteFilters,
    manager?: EntityManager,
  ): Promise<IUserInvite | null> {
    const qb = this.repository(manager)
      .createQueryBuilder('invite')
      .leftJoinAndSelect('invite.invitedUser', 'invitedUser')
      .where('invite.deletedAt IS NULL')
      .andWhere('invitedUser.deletedAt IS NULL')
      .andWhere('invitedUser.isActive = :isActive', { isActive: true })
      .andWhere('invitedUser.isVerified = :isVerified', { isVerified: true })

    if (filters?.name) {
      qb.andWhere('invite.name = :name', { name: filters.name })
    }
    if (filters?.email) {
      qb.andWhere('invite.email = :email', { email: filters.email })
    }
    if (filters?.inviteType) {
      qb.andWhere('invite.inviteType = :inviteType', {
        inviteType: filters.inviteType,
      })
    }
    if (filters?.status) {
      qb.andWhere('invite.status = :status', { status: filters.status })
    }
    if (filters?.token) {
      qb.andWhere('invite.token = :token', { token: filters.token })
    }
    if (filters?.invitedById) {
      qb.andWhere('invite.invitedById = :invitedById', {
        invitedById: filters.invitedById,
      })
    }
    if (filters?.invitedUserId) {
      qb.andWhere('invite.invitedUserId = :invitedUserId', {
        invitedUserId: filters.invitedUserId,
      })
    }

    return qb.getOne()
  }

  create(
    invite: Partial<IUserInvite>,
    manager?: EntityManager,
  ): Promise<IUserInvite> {
    const newInvite = this.repository(manager).create(invite)
    return this.repository(manager).save(newInvite)
  }

  partialUpdate(
    existingInvite: IUserInvite,
    invite: Partial<IUserInvite>,
    manager?: EntityManager,
  ): Promise<IUserInvite> {
    const updatedInvite = this.repository(manager).merge(existingInvite, invite)
    return this.repository(manager).save(updatedInvite)
  }

  async updateById(
    id: number,
    userInvite: Partial<IUserInvite>,
    manager?: EntityManager,
  ): Promise<IUserInvite> {
    const qb = await this.repository(manager)
      .createQueryBuilder('userInvite')
      .update()
      .set(userInvite)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async updateManyByUser(
    userId: number,
    userInvite: Partial<IUserInvite>,
    inviteType?: UserInviteTypeEnum,
    status?: UserInviteStatusEnum,
    manager?: EntityManager,
  ): Promise<IUserInvite[]> {
    const qb = this.repository(manager)
      .createQueryBuilder('userInvite')
      .update()
      .set(userInvite)
      .where('invitedUserId = :userId', { userId })

    if (inviteType) {
      qb.andWhere('inviteType = :inviteType', { inviteType })
    }
    if (status) {
      qb.andWhere('status = :status', { status })
    }

    const result = await qb.returning('*').execute()
    return result.raw
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('userInvite')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('userInvite')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDeleteManyByUser(
    userId: number,
    inviteType?: UserInviteTypeEnum,
    status?: UserInviteStatusEnum,
    manager?: EntityManager,
  ): Promise<boolean> {
    const qb = this.repository(manager)
      .createQueryBuilder('userInvite')
      .softDelete()
      .where('invitedUserId = :userId', { userId })
    if (inviteType) {
      qb.andWhere('inviteType = :inviteType', { inviteType })
    }
    if (status) {
      qb.andWhere('status = :status', { status })
    }
    const result = await qb.execute()
    return result.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('userInvite')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
