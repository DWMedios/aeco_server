import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './Base';
import { Reward } from './Reward.entity';

@Entity('reward_categories')
export class RewardCategory extends Base {
  @Column({ length: 100 })
  folio: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Reward, (reward) => reward.category)
  rewards: Reward[];
}
