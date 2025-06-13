import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { normalizeString } from '@shared/utils/functions'
import { BaseFiltersDto } from '@shared/domain/dto/Filters.dto'
import {
  OrderByFieldContractorType,
  OrderByFieldCampaignType,
  OrderByFieldAdvertisingType,
} from '@shared/domain/enums/Filters.enum'

export class ContractorFiltersDto extends BaseFiltersDto {
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

  @ApiPropertyOptional({
    description: 'Filtrar por nombre del contratista',
    example: 'juan',
  })
  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @ApiPropertyOptional({
    description: 'Filtrar por email del contratista',
    example: 'juan@empresa.com',
  })
  @IsOptional()
  @IsString({ message: 'email debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly email?: string

  @ApiPropertyOptional({
    description: 'Filtrar por teléfono del contratista',
    example: '1234567890',
  })
  @IsOptional()
  @IsString({ message: 'phone debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly phone?: string

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    enum: ['createdAt', 'name', 'email', 'status', 'id'],
    example: 'name',
  })
  @IsOptional()
  @IsIn(['createdAt', 'name', 'email', 'status', 'id'], {
    message: 'orderByField debe ser createdAt, name, email, status o id',
  })
  readonly orderByField?: OrderByFieldContractorType
}

export class CampaignFiltersDto extends BaseFiltersDto {
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

  @ApiPropertyOptional({
    description: 'Filtrar por nombre del contrato',
    example: 'campaña verano',
  })
  @IsOptional()
  @IsString({ message: 'contractName debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly contractName?: string

  @ApiPropertyOptional({
    description: 'Filtrar por descripción de la campaña',
    example: 'promoción',
  })
  @IsOptional()
  @IsString({ message: 'description debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly description?: string

  @ApiPropertyOptional({
    description: 'Filtrar por nombre de la compañía',
    example: 'empresa',
  })
  @IsOptional()
  @IsString({ message: 'companyName debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly companyName?: string

  @ApiPropertyOptional({
    description: 'Filtrar por fecha de inicio (formato ISO)',
    example: '2025-06-01T00:00:00Z',
  })
  @IsOptional()
  @IsISO8601({}, { message: 'startDate debe ser una fecha válida' })
  readonly startDate?: string

  @ApiPropertyOptional({
    description: 'Filtrar por fecha de fin (formato ISO)',
    example: '2025-08-31T23:59:59Z',
  })
  @IsOptional()
  @IsISO8601({}, { message: 'endDate debe ser una fecha válida' })
  readonly endDate?: string

  @ApiPropertyOptional({
    description: 'Filtrar por estado activo/inactivo',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly isEnabled?: boolean

  @ApiPropertyOptional({
    description: 'Filtrar por ID del contratista',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'contractorId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly contractorId?: number

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    enum: [
      'createdAt',
      'contractName',
      'startDate',
      'endDate',
      'contractorId',
      'id',
    ],
    example: 'startDate',
  })
  @IsOptional()
  @IsIn(
    ['createdAt', 'contractName', 'startDate', 'endDate', 'contractorId', 'id'],
    {
      message:
        'orderByField debe ser createdAt, contractName, startDate, endDate, contractorId o id',
    },
  )
  readonly orderByField?: OrderByFieldCampaignType
}

export class FilterCampaignByDateDto {
  @ApiProperty({
    description: 'ID de la compañía para filtrar campañas',
    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'companyId es requerido' })
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId: number

  @ApiProperty({
    description: 'Fecha de inicio para el rango de filtrado (formato ISO)',
    example: '2025-06-01T00:00:00Z',
  })
  @IsNotEmpty({ message: 'startDate es requerido' })
  @IsISO8601({}, { message: 'startDate debe ser una fecha válida' })
  readonly startDate: string

  @ApiProperty({
    description: 'Fecha de fin para el rango de filtrado (formato ISO)',
    example: '2025-08-31T23:59:59Z',
  })
  @IsNotEmpty({ message: 'endDate es requerido' })
  @IsISO8601({}, { message: 'endDate debe ser una fecha válida' })
  readonly endDate: string
}

export class FilterAdvertisingDto extends BaseFiltersDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nombre de la compañía',
    example: 'empresa',
  })
  @IsOptional()
  @IsString({ message: 'companyName debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly companyName?: string

  @ApiPropertyOptional({
    description: 'Filtrar por estado activo/inactivo',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly isEnabled?: boolean

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    enum: ['createdAt', 'id', 'companyName', 'isEnabled'],
    example: 'createdAt',
  })
  @IsOptional()
  @IsIn(['createdAt', 'id', 'companyName', 'isEnabled'], {
    message: 'orderByField debe ser createdAt, id, companyName o isEnabled',
  })
  readonly orderByField?: OrderByFieldAdvertisingType
}
