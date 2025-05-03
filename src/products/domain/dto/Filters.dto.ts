import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator'
import {
  OrderByFieldProductCapacityType,
  OrderByFieldProductType,
} from '@shared/domain/enums/Filters.enum'
import { normalizeString } from '@shared/utils/functions'
import { BaseFiltersDto } from '@shared/domain/dto/Filters.dto'

export class ProductFiltersDto extends BaseFiltersDto {
  @ApiPropertyOptional({
    description: 'Filtrar productos que tienen capacidad asignada',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'withCapacity debe ser un booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly withCapacity?: boolean

  @ApiPropertyOptional({
    description: 'Filtrar por código del producto (solo números)',
    example: '12345',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'code debe ser una cadena de texto' })
  @Matches(/^[0-9]+$/, {
    message: 'El código debe contener solo números',
  })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly code?: string

  @ApiPropertyOptional({
    description: 'Filtrar por nombre del producto',
    example: 'Smartphone',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @ApiPropertyOptional({
    description: 'Filtrar por familia o categoría del producto',
    example: 'Electrónicos',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'family debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly family?: string

  @ApiPropertyOptional({
    description: 'Filtrar por descripción del producto',
    example: 'smartphone',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'description debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly description?: string

  @ApiPropertyOptional({
    description: 'Filtrar por ID de la capacidad del producto',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'capacityId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly capacityId?: number

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    enum: ['createdAt', 'code', 'name', 'family', 'id'],
    example: 'name',
    type: String,
  })
  @IsOptional()
  @IsIn(['createdAt', 'code', 'name', 'family', 'id'], {
    message: 'orderByField debe ser createdAt, code, name o family',
  })
  readonly orderByField?: OrderByFieldProductType
}

export class ProductCapacityFiltersDto extends BaseFiltersDto {
  @ApiPropertyOptional({
    description: 'Filtrar por tipo de empaque',
    example: 'Caja',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'packaging debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly packaging?: string

  @ApiPropertyOptional({
    description: 'Filtrar por peso de la capacidad',
    example: 1.5,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'weight debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly weight?: number

  @ApiPropertyOptional({
    description: 'Filtrar por factor de conversión',
    example: 12,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'factor debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly factor?: number

  @ApiPropertyOptional({
    description: 'Filtrar por descripción de la capacidad',
    example: 'premium',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'description debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly description?: string

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    enum: ['createdAt', 'name', 'packaging', 'weight', 'factor', 'id'],
    example: 'weight',
    type: String,
  })
  @IsOptional()
  @IsIn(['createdAt', 'name', 'packaging', 'weight', 'factor', 'id'], {
    message:
      'orderByField debe ser createdAt, name, packaging, weight o factor',
  })
  readonly orderByField?: OrderByFieldProductCapacityType
}
