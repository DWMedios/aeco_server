import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@common/infra/entities'
import type { IUser } from '@common/domain/entities'
import type { IUserRepository } from '@shared/domain/repositories'
import { TransactionalRepository } from '../base/transactional.repository'
import { UserFiltersDto } from '@shared/domain/dto/Filters.dto'

@Injectable()
export class UserRepository
  extends TransactionalRepository<IUser>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    readonly entityRepository: Repository<IUser>,
  ) {
    super(entityRepository)
  }

  exists(email: string, manager?: EntityManager): Promise<boolean> {
    return this.repository(manager).exists({ where: { email, isActive: true } })
  }

  findByIdWithPassword(
    id: number,
    manager?: EntityManager,
  ): Promise<IUser | null> {
    return this.repository(manager).findOne({
      where: { id, isActive: true },
      select: ['id', 'password'],
    })
  }

  findById(id: number, manager?: EntityManager): Promise<IUser | null> {
    return this.repository(manager).findOne({
      where: { id, isActive: true },
      relations: ['role', 'company'],
    })
  }

  findByEmail(email: string, manager?: EntityManager): Promise<IUser | null> {
    return this.repository(manager)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne()
  }

  findOneByCompany(
    userId: number,
    companyId: number,
    manager?: EntityManager,
  ): Promise<IUser | null> {
    return this.repository(manager)
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .andWhere('user.companyId = :companyId', { companyId })
      .getOne()
  }

  findForValidation(
    email: string,
    manager?: EntityManager,
  ): Promise<IUser | null> {
    return this.repository(manager)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.company', 'company')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.password',
        'user.isActive',
        'company.id',
        'company.name',
        'role.id',
        'role.role',
        'role.apiKey',
        'role.token',
      ])
      .where('user.email = :email', { email })
      .andWhere('user.isActive = true')
      .andWhere('user.deletedAt IS NULL')
      .andWhere('role.deletedAt IS NULL')
      .andWhere('company.deletedAt IS NULL')
      .getOne()
  }

  findAll(
    filters: UserFiltersDto,
    companies?: number[],
    manager?: EntityManager,
  ): Promise<[IUser[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.role', 'role')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.phone',
        'user.position',
        'user.isActive',
        'user.createdAt',
        'role.id',
        'role.role',
        'company.id',
        'company.name',
      ])
      .where('company.id IS NOT NULL')

    if (companies?.length) {
      qb.andWhere('company.id IN (:...companies)', { companies })
    }

    if (filters?.name) {
      qb.andWhere('LOWER(unaccent(BTRIM(user.name))) ILIKE :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters?.email) {
      qb.andWhere('LOWER(unaccent(BTRIM(user.email))) ILIKE :email', {
        email: `%${filters.email}%`,
      })
    }

    if (filters?.role) {
      qb.andWhere('role.role = :role', { role: filters.role })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(`user.${filters.orderByField}`, filters.orderByDirection)
    }

    return qb.getManyAndCount()
  }

  create(user: Partial<IUser>, manager?: EntityManager): Promise<IUser> {
    const newUser = this.repository(manager).create(user)
    return this.repository(manager).save(newUser)
  }

  update(
    exists: IUser,
    user: Partial<IUser>,
    manager?: EntityManager,
  ): Promise<IUser> {
    const updatedUser = this.repository(manager).merge(exists, user)
    return this.repository(manager).save(updatedUser)
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const result = await this.repository(manager)
      .createQueryBuilder('user')
      .delete()
      .where('id = :id', { id })
      .execute()

    return result.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const result = await this.repository(manager)
      .createQueryBuilder('user')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return result.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const result = await this.repository(manager)
      .createQueryBuilder('user')
      .restore()
      .where('id = :id', { id })
      .execute()

    return result.affected !== 0
  }
}
