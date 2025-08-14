import { ApiProperty } from '@nestjs/swagger'
import type { IDailyStats, IPackagingStats } from '@common/domain/entities'
import type { PackingType } from '@common/domain/Types'

export class DailyStatsResponseDto implements IDailyStats {
  @ApiProperty({
    description: 'Total de tickets registrados',
    example: 125,
    type: Number,
  })
  readonly totalTickets: number

  @ApiProperty({
    description: 'Total de botellas registradas',
    example: 78,
    type: Number,
  })
  readonly totalBottles: number

  @ApiProperty({
    description: 'Total de latas registradas',
    example: 47,
    type: Number,
  })
  readonly totalCans: number

  @ApiProperty({
    description: 'ID de la compañía asociada a las estadísticas',
    example: 1,
    required: false,
    type: Number,
  })
  readonly companyId?: number

  @ApiProperty({
    description: 'ID del AECO asociado a las estadísticas',
    example: 2,
    required: false,
    type: Number,
  })
  readonly aecoId?: number

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2025-05-02T10:30:00Z',
    required: false,
    type: Date,
  })
  readonly createdAt?: Date

  // Las relaciones company y aeco no se incluyen en la documentación
  // ya que normalmente no se devuelven en las respuestas de API
  company?: any
  aeco?: any
}

export class PackagingStatsResponseDto implements IPackagingStats {
  @ApiProperty({
    description: 'Tipo de empaque',
    example: 'bottle',
    enum: ['bottle', 'can'],
  })
  readonly packagingType: PackingType

  @ApiProperty({
    description: 'Cantidad total del tipo de empaque',
    example: 78,
    type: Number,
  })
  readonly totalCount: number

  @ApiProperty({
    description: 'ID de la compañía asociada a las estadísticas',
    example: 1,
    required: false,
    type: Number,
  })
  readonly companyId?: number

  @ApiProperty({
    description: 'ID del AECO asociado a las estadísticas',
    example: 2,
    required: false,
    type: Number,
  })
  readonly aecoId?: number

  // Las relaciones company y aeco no se incluyen en la documentación
  company?: any
  aeco?: any
}

// DTO para la estructura de respuesta de packagings-per-day
export class PackagingsPerDayResponseDto {
  @ApiProperty({
    description: 'Fecha del registro',
    example: '2025-05-01',
    type: String,
  })
  date: string

  @ApiProperty({
    description: 'Cantidad de empaques registrados en esta fecha',
    example: 25,
    type: Number,
  })
  count: number
}
