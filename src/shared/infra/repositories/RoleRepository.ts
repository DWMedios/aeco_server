import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRolePermissions } from '@common/infra/entities'
import type { IUserRolePermissions } from '@common/domain/entities'
import type { IRoleRepository } from '@shared/domain/repositories/IRoleRepository'
import { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'
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

  findByApiKeyAndToken(
    apiKey: string,
    token?: string,
    type?: UserRoleEntiyEnum,
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

    if (token) {
      qb.andWhere('role.token = :token', { token })
    }

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

  update(
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
