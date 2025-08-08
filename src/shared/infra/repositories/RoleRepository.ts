import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRolePermissions } from '@common/infra/entities'
import { UserRoleEntityEnum } from '@common/domain/enums/UserRole.enum'
import type { IUserRolePermissions } from '@common/domain/entities'
import type { IRoleRepository } from '@shared/domain/repositories'
import type { UserRoleFilters } from '@shared/domain/Filters'
import { TransactionalRepository } from '../base/transactional.repository'

@Injectable()
export class RoleRepository
  extends TransactionalRepository<IUserRolePermissions>
  implements IRoleRepository
{
  constructor(
    @InjectRepository(UserRolePermissions)
    readonly entityRepository: Repository<IUserRolePermissions>,
  ) {
    super(entityRepository)
  }

  findById(
    id: number,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions | null> {
    return this.repository(manager).findOne({
      where: { id },
      relations: ['user', 'user.company'],
    })
  }

  findBy(
    filters: UserRoleFilters,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions | null> {
    const qb = this.repository(manager)
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.user', 'user')
      .leftJoinAndSelect('user.company', 'company')
      .select([
        'role.id',
        'role.role',
        'role.apiKey',
        'role.token',
        'role.userId',
        'user.name',
        'user.email',
        'user.isActive',
        'company.id',
        'company.name',
      ])
      .where('role.deletedAt IS NULL')
      .andWhere('user.deletedAt IS NULL')
      .andWhere('company.deletedAt IS NULL')

    if (filters?.apiKey) {
      qb.andWhere('role.apiKey = :apiKey', { apiKey: filters.apiKey })
    }
    if (filters?.role) {
      qb.andWhere('role.role = :type', { type: filters.role })
    }
    if (filters?.isActive !== undefined) {
      qb.andWhere('user.isActive = :isActive', { isActive: filters.isActive })
    }
    if (filters?.companyId) {
      qb.andWhere('role.companyId = :companyId', {
        companyId: filters.companyId,
      })
    }
    if (filters?.userId) {
      qb.andWhere('role.userId = :userId', { userId: filters.userId })
    }

    if (filters?.userEmail) {
      qb.andWhere('user.email = :userEmail', { userEmail: filters.userEmail })
    }

    if (filters?.isUserVerified !== undefined) {
      qb.andWhere('user.isVerified = :isUserVerified', {
        isUserVerified: filters.isUserVerified,
      })
    }

    return qb.getOne()
  }

  findByApiKey(
    apiKey: string,
    type?: UserRoleEntityEnum,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions | null> {
    const qb = this.repository(manager)
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.user', 'user')
      .leftJoinAndSelect('user.company', 'company')
      .select([
        'role.id',
        'role.role',
        'role.apiKey',
        'role.token',
        'role.userId',
        'user.name',
        'user.email',
        'company.id',
        'company.name',
      ])
      .where('role.apiKey = :apiKey', { apiKey })
      .andWhere('role.deletedAt IS NULL')
      .andWhere('user.deletedAt IS NULL AND user.isActive = true')
      .andWhere('company.deletedAt IS NULL')

    if (type) {
      qb.andWhere('role.role = :type', { type })
    }

    return qb.getOne()
  }

  create(
    role: Partial<IUserRolePermissions>,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions> {
    const newRole = this.repository(manager).create(role)
    return this.repository(manager).save(newRole)
  }

  partialUpdate(
    existingRole: IUserRolePermissions,
    role: Partial<IUserRolePermissions>,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions> {
    const updatedRole = this.repository(manager).merge(existingRole, role)
    return this.repository(manager).save(updatedRole)
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('role')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('role')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('role')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
