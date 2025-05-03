import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator'
import { normalizeString } from '@shared/utils/functions'
import { BaseFiltersDto } from '@shared/domain/dto/Filters.dto'
import { OrderByFieldTicketType } from '@shared/domain/enums/Filters.enum'

export class TicketsFiltersDto extends BaseFiltersDto {
  @ApiPropertyOptional({
    description: 'Filtrar por folio del ticket',
    example: 'AECO-TICKET',
  })
  @IsOptional()
  @IsString({ message: 'folio debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  folio?: string

  @ApiPropertyOptional({
    description: 'Filtrar por ID del AECO',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'aecoId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  aecoId?: number

  @ApiPropertyOptional({
    description: 'Filtrar por ID del producto',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'aecoId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  productId?: number

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    enum: [
      'folio',
      'totalCans',
      'totalBottles',
      'aecoId',
      'productId',
      'id',
      'createdAt',
    ],
    example: 'createdAt',
  })
  @IsOptional()
  @IsIn(
    [
      'folio',
      'totalCans',
      'totalBottles',
      'aecoId',
      'productId',
      'id',
      'createdAt',
    ],
    {
      message:
        'orderByField debe ser folio, totalCans, totalBottles, aecoId o productId',
    },
  )
  readonly orderByField?: OrderByFieldTicketType
}
