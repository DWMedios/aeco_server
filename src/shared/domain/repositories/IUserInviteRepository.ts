import type { EntityManager } from 'typeorm'
import type { IUserInvite } from '@common/domain/entities/IUserInvite'
import type { IUserInviteFilters } from '../Filters'

export const USER_INVITE_REPOSITORY = Symbol('IUserInviteRepository')

export interface IUserInviteRepository {
  findById(id: number, manager?: EntityManager): Promise<IUserInvite | null>
  findBy(
    filters: IUserInviteFilters,
    manager?: EntityManager,
  ): Promise<IUserInvite | null>
  create(
    invite: Partial<IUserInvite>,
    manager?: EntityManager,
  ): Promise<IUserInvite>
  partialUpdate(
    existingInvite: IUserInvite,
    invite: Partial<IUserInvite>,
    manager?: EntityManager,
  ): Promise<IUserInvite>
  updateById(
    id: number,
    userInvite: Partial<IUserInvite>,
    manager?: EntityManager,
  ): Promise<IUserInvite>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
