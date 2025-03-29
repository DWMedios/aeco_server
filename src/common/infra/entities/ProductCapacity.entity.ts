import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Product } from './Product.entity'
import type { IProductCapacity } from '@common/domain/entities'

@Entity({ name: 'product_capacities' })
export class ProductCapacity extends Base implements IProductCapacity {
  @Column({ type: 'varchar', nullable: false })
  packaging: string

  @Column({ type: 'float', nullable: false })
  weight: number

  @Column({ type: 'int', nullable: false })
  factor: number

  @Column({ type: 'text', nullable: true })
  description?: string

  @OneToMany(() => Product, (product) => product.capacity)
  products: Product[]
}
