import type { EntityManager } from 'typeorm'
import type { IUserRolePermissions } from '@common/domain/entities'
import type { UserRoleEntityEnum } from '@common/domain/enums/UserRole.enum'
import type { UserRoleFilters } from '../Filters'

export const ROLE_REPOSITORY = Symbol('IRoleRepository')

export interface IRoleRepository {
  findById(
    id: number,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions | null>
  findBy(
    filters: UserRoleFilters,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions | null>
  findByApiKey(
    apiKey: string,
    type?: UserRoleEntityEnum,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions | null>
  create(
    role: Partial<IUserRolePermissions>,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions>
  partialUpdate(
    existingRole: IUserRolePermissions,
    role: Partial<IUserRolePermissions>,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  softDeleteManyByUsers(
    userIds: number[],
    manager?: EntityManager,
  ): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
