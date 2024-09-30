import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Reward } from './Reward.entity'

@Entity('reward_categories')
export class RewardCategory extends Base {
  @Column({ length: 100 })
  name: string

  @Column({ default: 0 })
  status: number

  @Column()
  order: number

  @OneToMany(() => Reward, (reward) => reward.category)
  rewards: Reward[]
}
