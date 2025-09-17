import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { normalizeString } from '@shared/utils/functions'
import { BaseFiltersDto } from '@shared/domain/dto/Filters.dto'
import { OrderByFieldCompanyType } from '@shared/domain/enums/Filters.enum'

export class CompanyFiltersDto extends BaseFiltersDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nombre de empresa',
    example: 'empresa',
  })
  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @ApiPropertyOptional({
    description: 'Filtrar por RFC',
    example: 'EMP010101ABC',
  })
  @IsOptional()
  @IsString({ message: 'rfc debe ser una cadena de texto' })
  @Transform(({ value }) => value?.toUpperCase().trim())
  readonly rfc?: string

  @ApiPropertyOptional({
    description: 'Filtrar por estado',
    example: 'yucatan',
  })
  @IsOptional()
  @IsString({ message: 'state debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly state?: string

  @ApiPropertyOptional({
    description: 'Filtrar por ciudad',
    example: 'merida',
  })
  @IsOptional()
  @IsString({ message: 'city debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly city?: string

  @ApiPropertyOptional({
    description: 'Filtrar por dirección',
    example: 'centro',
  })
  @IsOptional()
  @IsString({ message: 'address debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly address?: string

  @ApiPropertyOptional({
    description: 'Filtrar por código postal',
    example: '97000',
  })
  @IsOptional()
  @IsString({ message: 'postalCode debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly postalCode?: string

  @ApiPropertyOptional({
    description: 'Filtrar por teléfono',
    example: '9991234567',
  })
  @IsOptional()
  @IsString({ message: 'phone debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly phone?: string

  @ApiPropertyOptional({
    description: 'Filtrar por estado activo/inactivo',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly status?: boolean

  @ApiProperty({
    description: 'Filtrar por ID de la compañía',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    example: 'name',
    enum: [
      'createdAt',
      'name',
      'rfc',
      'state',
      'city',
      'postalCode',
      'phone',
      'id',
    ],
  })
  @IsOptional()
  @IsIn(
    ['createdAt', 'name', 'rfc', 'state', 'city', 'postalCode', 'phone', 'id'],
    {
      message:
        'orderByField debe ser createdAt, name, rfc, state, city, postalCode o phone',
    },
  )
  readonly orderByField?: OrderByFieldCompanyType
}
