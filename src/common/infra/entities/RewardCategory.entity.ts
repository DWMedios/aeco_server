import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Aeco } from './Aeco.entity'
import { Reward } from './Reward.entity'
import type { IRewardCategory } from '../../domain/entities/IRewardCategory'

@Entity({ name: 'reward_categories' })
export class RewardCategory extends Base implements IRewardCategory {
  @Column({ length: 100 })
  name: string

  @Column({ nullable: true, default: true, type: 'bool' })
  status: boolean

  @Column()
  order: number

  @Column({ nullable: true })
  aecoId: number

  @ManyToOne(() => Aeco, (aeco) => aeco.rewardCategories)
  aeco: Aeco

  @OneToMany(() => Reward, (reward) => reward.category)
  rewards: Reward[]
}
