import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Aeco } from './Aeco.entity'
import { Product } from './Product.entity'
import { Company } from './Company.entity'
import type { IProductStats } from '@common/domain/entities'

@Entity({ name: 'product_stats' })
export class ProductStats extends Base implements IProductStats {
  @Column({ type: 'int', default: 0 })
  totalCount: number

  @Column({ type: 'int', nullable: true })
  productId?: number

  @Column({ type: 'int', nullable: true })
  companyId?: number

  @Column({ type: 'int', nullable: true })
  aecoId?: number

  @ManyToOne(() => Product, (product) => product.stats)
  product?: Product

  @ManyToOne(() => Company, (company) => company.productStats)
  company?: Company

  @ManyToOne(() => Aeco, (aeco) => aeco.productStats)
  aeco?: Aeco
}
