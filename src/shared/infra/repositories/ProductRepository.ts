import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '@common/infra/entities'
import type { IProduct } from '@common/domain/entities'
import type { IProductRepository } from '@shared/domain/repositories'
import type { ProductFiltersDto } from '@shared/domain/dto/Filters.dto'
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
      qb.where('products.capacityId = :capacityId', {
        capacityId: filters.capacityId,
      })
    }

    if (filters.name) {
      qb.where('LOWER(unaccent(BTRIM(products.name))) ILIKE :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters.family) {
      qb.where('LOWER(unaccent(BTRIM(products.family))) ILIKE :family', {
        family: `%${filters.family}%`,
      })
    }

    if (filters.description) {
      qb.where(
        'LOWER(unaccent(BTRIM(products.description))) ILIKE :description',
        { description: `%${filters.description}%` },
      )
    }

    if (filters.code) {
      qb.where('LOWER(unaccent(BTRIM(products.code))) ILIKE :code', {
        code: `%${filters.code}%`,
      })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(`products.${filters.orderByField}`, filters.orderByDirection)
    }

    return qb.getManyAndCount()
  }

  create(
    product: Partial<IProduct>,
    manager?: EntityManager,
  ): Promise<IProduct> {
    const newProduct = this.repository(manager).create(product)
    return this.repository(manager).save(newProduct)
  }

  async update(
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
