import {
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    select: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Index()
  createdAt?: Date

  @UpdateDateColumn({
    select: false,
    type: 'timestamptz',
    default: null,
  })
  updatedAt?: Date

  @DeleteDateColumn({
    select: false,
    type: 'timestamptz',
    default: null,
  })
  deletedAt?: Date
}
