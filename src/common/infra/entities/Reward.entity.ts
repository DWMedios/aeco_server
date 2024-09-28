import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './Base';
import { Aeco } from './Aeco.entity';
import { RewardCategory } from './RewardCategory.entity';

@Entity('rewards')
export class Reward extends Base {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  image: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: 0 })
  status: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>[];

  @Column({ nullable: true })
  aecoId: number;

  @ManyToOne(() => Aeco, (aeco) => aeco.tickets)
  aeco: Aeco;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => RewardCategory, (category) => category.rewards)
  category: RewardCategory;
}
