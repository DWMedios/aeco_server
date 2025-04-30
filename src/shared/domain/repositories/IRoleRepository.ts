import type { EntityManager } from 'typeorm'
import type { IUserRolePermissions } from '@common/domain/entities'
import type { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'

export const ROLE_REPOSITORY = Symbol('IRoleRepository')

export interface IRoleRepository {
  findById(
    id: number,
    manager?: EntityManager,
  ): Promise<IUserRolePermissions | null>
  findByApiKeyAndToken(
    apiKey: string,
    token?: string,
    type?: UserRoleEntiyEnum,
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
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
