import { Column, Entity, Index } from 'typeorm'
import { Base } from './Base'
import { AecoAttemptsEnum } from '@common/domain/enums/AecoAttempts.enum'
import type { IAecoCoords } from '@common/domain/Types'
import type { IAecoAttempts } from '@common/domain/entities'

@Entity({ name: 'aecos_attempts' })
export class AecoAttempts extends Base implements IAecoAttempts {
  @Column({ type: 'text' })
  @Index()
  serialNumber: string

  @Column({ type: 'text', nullable: true })
  @Index()
  ipAddress?: string

  @Column('enum', {
    enum: AecoAttemptsEnum,
    default: AecoAttemptsEnum.DISABLED,
    nullable: false,
  })
  reason: AecoAttemptsEnum

  @Column({ type: 'jsonb', nullable: true })
  requestData?: Record<string, any> // Headers/body de la request

  @Column({ type: 'jsonb', nullable: true })
  geolocation?: IAecoCoords

  @Column({ type: 'text', nullable: true })
  errorMessage?: string
}
