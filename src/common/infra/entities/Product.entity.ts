import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { ProductCapacity } from './ProductCapacity.entity'
import type { IProduct } from '@common/domain/entities/IProduct'

@Entity({ name: 'products' })
export class Product extends Base implements IProduct {
  @Column({ type: 'text', nullable: false, unique: true })
  code: string

  @Column({ type: 'text', nullable: false })
  family: string

  @Column({ type: 'text', nullable: false })
  name: string

  @Column({ type: 'int', nullable: false })
  capacityId: number

  @ManyToOne(() => ProductCapacity, (capacity) => capacity.products)
  capacity: ProductCapacity
}
