import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Aeco } from './Aeco.entity'
import { Base } from './Base'
import type { IPage } from '../../domain/entities/IPage'

@Entity({ name: 'pages' })
export class Page extends Base implements IPage {
  @Column({ length: 100 })
  name: string

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>

  @Column()
  aecoId: number

  @ManyToOne(() => Aeco, (aeco) => aeco.pages)
  @JoinColumn({ name: 'aecoId' })
  aeco: Aeco
}
