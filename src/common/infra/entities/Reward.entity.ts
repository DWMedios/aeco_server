import { Entity, Column, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { RewardCategory } from './RewardCategory.entity'
import type { IReward } from '../../domain/entities/IReward'

@Entity({ name: 'rewards' })
export class Reward extends Base implements IReward {
  @Column({ length: 100 })
  name: string

  @Column({ length: 100 })
  image: string

  @Column({ default: 0 })
  order: number

  @Column({ nullable: true, default: true, type: 'bool' })
  status: boolean

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>[]

  @Column({ nullable: true })
  categoryId: number

  @ManyToOne(() => RewardCategory, (category) => category.rewards)
  category: RewardCategory
}
