import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '@common/infra/entities'
import type { IProduct } from '@common/domain/entities'
import type { IProductRepository } from '@shared/domain/repositories'
import type { ProductFiltersDto } from '@products/domain/dto/Filters.dto'
import type { ProductFilterByOptions } from '@products/domain/Types'
import { TransactionalRepository } from '../base/transactional.repository'

@Injectable()
export class ProductRepository
  extends TransactionalRepository<IProduct>
  implements IProductRepository
{
  constructor(
    @InjectRepository(Product)
    readonly entityRepository: Repository<IProduct>,
  ) {
    super(entityRepository)
  }

  existsBy(
    filters: ProductFilterByOptions,
    manager?: EntityManager,
  ): Promise<boolean> {
    const whereClause: any = {}

    if (filters?.code) {
      whereClause.code = filters.code
    }

    if (filters?.name) {
      whereClause.name = filters.name
    }

    return this.repository(manager).exists({
      where: whereClause,
    })
  }

  findById(
    id: number,
    withCapacity = false,
    manager?: EntityManager,
  ): Promise<IProduct | null> {
    const qb = this.repository(manager)
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.code',
        'product.name',
        'product.family',
        'product.capacityId',
      ])

    if (withCapacity) {
      qb.leftJoinAndSelect('product.capacity', 'capacity').addSelect([
        'capacity.id',
        'capacity.packaging',
        'capacity.weight',
        'capacity.factor',
        'capacity.description',
      ])
    }
    return qb.where('product.id = :id', { id }).getOne()
  }

  findAll(
    filters: ProductFiltersDto,
    manager?: EntityManager,
  ): Promise<[IProduct[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('products')
      .select([
        'products.id',
        'products.code',
        'products.name',
        'products.family',
        'products.capacityId',
      ])

    if (filters?.withCapacity && filters?.withCapacity === true) {
      qb.leftJoinAndSelect('products.capacity', 'capacity').addSelect([
        'capacity.id',
        'capacity.packaging',
        'capacity.weight',
        'capacity.factor',
        'capacity.description',
      ])
    }

    if (filters.capacityId) {
      qb.orWhere('products.capacityId = :capacityId', {
        capacityId: filters.capacityId,
      })
    }

    if (filters.name) {
      qb.orWhere('LOWER(unaccent(BTRIM(products.name))) ILIKE :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters.family) {
      qb.orWhere('LOWER(unaccent(BTRIM(products.family))) ILIKE :family', {
        family: `%${filters.family}%`,
      })
    }

    if (filters.description) {
      qb.orWhere(
        'LOWER(unaccent(BTRIM(products.description))) ILIKE :description',
        { description: `%${filters.description}%` },
      )
    }

    if (filters.code) {
      qb.orWhere('LOWER(unaccent(BTRIM(products.code))) ILIKE :code', {
        code: `%${filters.code}%`,
      })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(`products.${filters.orderByField}`, filters.orderByDirection)
    }

    return qb.getManyAndCount()
  }

  findAllAfterLast(
    lastId: number,
    limit?: number,
    manager?: EntityManager,
  ): Promise<IProduct[]> {
    const qb = this.repository(manager)
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.code',
        'product.family',
        'product.name',
        'product.capacityId',
      ])
      .where('product.id > :lastId', { lastId })
      .orderBy('product.id', 'ASC')

    if (limit && limit > 0) {
      qb.take(limit || 10)
    }

    return qb.getMany()
  }

  findManyByIds(ids: number[], manager?: EntityManager): Promise<IProduct[]> {
    return this.repository(manager)
      .createQueryBuilder('product')
      .select(['product.id'])
      .where('product.id IN (:...ids)', { ids })
      .getMany()
  }

  create(
    product: Partial<IProduct>,
    manager?: EntityManager,
  ): Promise<IProduct> {
    const newProduct = this.repository(manager).create(product)
    return this.repository(manager).save(newProduct)
  }

  async updateById(
    id: number,
    product: Partial<IProduct>,
    manager?: EntityManager,
  ): Promise<IProduct> {
    const qb = await this.repository(manager)
      .createQueryBuilder('product')
      .update()
      .set(product)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('product')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('product')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('product')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
