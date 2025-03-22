import type { EntityManager } from 'typeorm'
import type { IUser } from '@common/domain/entities'
import type { UserFiltersDto } from '../dto/Filters.dto'

export const USER_REPOSITORY = Symbol('IUserRepository')

export interface IUserRepository {
  exists(email: string, manager?: EntityManager): Promise<boolean>
  findByIdWithPassword(
    id: number,
    manager?: EntityManager,
  ): Promise<IUser | null>
  findById(id: number, manager?: EntityManager): Promise<IUser | null>
  findByEmail(email: string, manager?: EntityManager): Promise<IUser | null>
  findOneByCompany(
    userId: number,
    companyId: number,
    manager?: EntityManager,
  ): Promise<IUser | null>
  findForValidation(
    email: string,
    manager?: EntityManager,
  ): Promise<IUser | null>
  findAll(
    filters: UserFiltersDto,
    companies?: number[],
    manager?: EntityManager,
  ): Promise<[IUser[], number]>
  create(user: Partial<IUser>, manager?: EntityManager): Promise<IUser>
  update(
    exists: IUser,
    user: Partial<IUser>,
    manager?: EntityManager,
  ): Promise<IUser>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
