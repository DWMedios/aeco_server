import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { normalizeString } from '@shared/utils/functions'
import { BaseFiltersDto } from '@shared/domain/dto/Filters.dto'
import { RewardTypeEnum } from '@common/domain/enums/RewardType.enum'
import { OrderByFieldRewardType } from '@shared/domain/enums/Filters.enum'

export class RewardFiltersDto extends BaseFiltersDto {
  @ApiProperty({
    description:
      'Filtrar por nombre de la recompensa (búsqueda parcial, no sensible a mayúsculas/minúsculas)',
    example: 'descuento',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @ApiProperty({
    description:
      'Filtrar por nombre del establecimiento (búsqueda parcial, no sensible a mayúsculas/minúsculas)',
    example: 'restaurante',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'establishment debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly establishment?: string

  @ApiProperty({
    description:
      'Filtrar por descripción de la recompensa (búsqueda parcial, no sensible a mayúsculas/minúsculas)',
    example: 'gratis',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'description debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly description?: string

  @ApiProperty({
    description:
      'Filtrar por notas de la recompensa (búsqueda parcial, no sensible a mayúsculas/minúsculas)',
    example: 'válido',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'note debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly note?: string

  @ApiProperty({
    description: 'Filtrar por estado de la recompensa (activa o inactiva)',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'status debe ser un booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly status?: boolean

  @ApiProperty({
    description: 'Filtrar por tipo de recompensa',
    enum: RewardTypeEnum,
    example: RewardTypeEnum.DISCOUNT,
    required: false,
  })
  @IsOptional()
  @IsEnum(RewardTypeEnum, {
    message: 'type debe ser un tipo de recompensa válido',
  })
  readonly type?: RewardTypeEnum

  @ApiProperty({
    description: 'ID de la compañía para filtrar campañas',
    example: 1,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @ApiProperty({
    description: 'Campo por el cual ordenar los resultados',
    example: 'name',
    enum: ['createdAt', 'name', 'order', 'status', 'establishment', 'id'],
    default: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsIn(['createdAt', 'name', 'order', 'status', 'establishment', 'id'], {
    message: 'orderByField debe ser createdAt, name, order, status o id',
  })
  readonly orderByField?: OrderByFieldRewardType
}
