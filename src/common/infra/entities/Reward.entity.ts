import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Base } from './Base'
import { Aeco } from './Aeco.entity'
import { Company } from './Company.entity'
import { RewardTypeEnum } from '@common/domain/enums/RewardType.enum'
import type { IReward } from '@common/domain/entities/IReward'

@Entity({ name: 'rewards' })
export class Reward extends Base implements IReward {
  @Column({ nullable: false, length: 100 })
  name: string

  @Column({ nullable: true, length: 100 })
  establishment?: string

  @Column({ nullable: true, type: 'text' })
  description?: string

  @Column({ nullable: true, type: 'text' })
  note?: string

  @Column({ nullable: true, type: 'text' })
  image?: string

  @Column({ nullable: true, default: true, type: 'bool' })
  status: boolean

  @Column({ type: 'enum', enum: RewardTypeEnum })
  type: RewardTypeEnum

  @Column({ default: 0, type: 'int' })
  order: number

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>

  @Column({ type: 'int', nullable: true })
  companyId?: number

  @ManyToOne(() => Company, (company) => company.rewards)
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  company?: Company

  @ManyToMany(() => Aeco, (aeco) => aeco.rewards)
  @JoinTable({
    name: 'rewards_aecos',
    joinColumn: {
      name: 'rewardId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'aecoId',
      referencedColumnName: 'id',
    },
  })
  aecos?: Aeco[]
}
