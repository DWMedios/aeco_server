import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Aeco } from './Aeco.entity'
import type { IAecoCoords } from '@common/domain/Types'
import type { IAecoRequestHistory } from '@common/domain/entities'

@Entity({ name: 'aecos_request_history' })
export class AecoRequestHistory extends Base implements IAecoRequestHistory {
  @Column({ type: 'text' })
  @Index()
  endpoint: string // Ej: "/api/v1/sensor-data"

  @Column({ type: 'text' })
  method: string // GET, POST, etc.

  @Column({ type: 'text', nullable: true })
  ipAddress?: string

  @Column({ type: 'jsonb', nullable: true })
  queryParams?: Record<string, any>

  @Column({ type: 'jsonb', nullable: true })
  requestBody?: Record<string, any>

  @Column({ type: 'jsonb', nullable: true })
  geolocation?: IAecoCoords

  @Column({ type: 'int', nullable: true })
  @Index()
  aecoId: number

  @ManyToOne(() => Aeco, (aeco) => aeco.requestHistory)
  @JoinColumn({ name: 'aecoId', referencedColumnName: 'id' })
  aeco?: Aeco
}
