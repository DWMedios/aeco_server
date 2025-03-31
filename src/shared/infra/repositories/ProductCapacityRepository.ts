import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductCapacity } from '@common/infra/entities'
import type { IProductCapacity } from '@common/domain/entities'
import type { IProductCapacityRepository } from '@shared/domain/repositories'
import { ProductCapacityFiltersDto } from '@shared/domain/dto/Filters.dto'
import { TransactionalRepository } from '../base/transactional.repository'

@Injectable()
export class ProductCapacityRepository
  extends TransactionalRepository<IProductCapacity>
  implements IProductCapacityRepository
{
  constructor(
    @InjectRepository(ProductCapacity)
    readonly entityRepository: Repository<IProductCapacity>,
  ) {
    super(entityRepository)
  }

  findById(
    id: number,
    withProducts = false,
    manager?: EntityManager,
  ): Promise<IProductCapacity | null> {
    const qb = this.repository(manager)
      .createQueryBuilder('productCapacity')
      .select([
        'productCapacity.id',
        'productCapacity.packaging',
        'productCapacity.weight',
        'productCapacity.factor',
        'productCapacity.description',
      ])

    if (withProducts) {
      qb.leftJoinAndSelect('productCapacity.products', 'products').addSelect([
        'products.id',
        'products.code',
        'products.name',
        'products.family',
      ])
    }
    return qb.where('productCapacity.id = :id', { id }).getOne()
  }

  findAll(
    filters: ProductCapacityFiltersDto,
    manager?: EntityManager,
  ): Promise<[IProductCapacity[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('productCapacity')
      .loadRelationCountAndMap(
        'productCapacity.totalProducts',
        'productCapacity.products',
      )
      .select([
        'productCapacity.id',
        'productCapacity.packaging',
        'productCapacity.weight',
        'productCapacity.factor',
        'productCapacity.description',
      ])

    if (filters.packaging) {
      qb.andWhere(
        'LOWER(unnaccent(BTRIM(productCapacity.packaging))) LIKE :packaging',
        {
          packaging: `%${filters.packaging}%`,
        },
      )
    }

    if (filters.weight) {
      qb.andWhere('productCapacity.weight = :weight', {
        weight: filters.weight,
      })
    }

    if (filters.factor) {
      qb.andWhere('productCapacity.factor = :factor', {
        factor: filters.factor,
      })
    }

    if (filters.description) {
      qb.andWhere(
        'LOWER(unnaccent(BTRIM(productCapacity.description))) LIKE :description',
        {
          description: `%${filters.description}%`,
        },
      )
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(
        `productCapacity.${filters.orderByField}`,
        filters.orderByDirection,
      )
    }

    return qb.getManyAndCount()
  }

  create(
    productCapacity: Partial<IProductCapacity>,
    manager?: EntityManager,
  ): Promise<IProductCapacity> {
    const newProductCapacity = this.repository(manager).create(productCapacity)
    return this.repository(manager).save(newProductCapacity)
  }

  async update(
    id: number,
    productCapacity: Partial<IProductCapacity>,
    manager?: EntityManager,
  ): Promise<IProductCapacity> {
    const qb = await this.repository(manager)
      .createQueryBuilder('productCapacity')
      .update()
      .set(productCapacity)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('productCapacity')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('productCapacity')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('productCapacity')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
