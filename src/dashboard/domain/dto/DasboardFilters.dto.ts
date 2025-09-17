import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator'
import type { OrderByDirectionType } from '@shared/domain/enums/Filters.enum'

export class DailyStatsFiltersDto {
  @ApiProperty({
    description: 'ID de la compañía para filtrar estadísticas',
    example: 1,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @ApiProperty({
    description: 'Fecha inicial para filtrar estadísticas',
    example: '2025-05-01',
    required: false,
    pattern: '^d{4}-d{2}-d{2}$',
  })
  @IsOptional()
  @IsString({ message: 'startDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe tener el formato yyyy-MM-DD',
  })
  readonly startDate?: string

  @ApiProperty({
    description: 'Fecha final para filtrar estadísticas',
    example: '2025-05-30',
    required: false,
    pattern: '^d{4}-d{2}-d{2}$',
  })
  @IsOptional()
  @IsString({ message: 'endDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe tener el formato yyyy-MM-DD',
  })
  readonly endDate?: string
}

export class TopStatsFiltersDto {
  @ApiProperty({
    description: 'ID de la compañía para filtrar estadísticas',
    example: 1,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @ApiProperty({
    description: 'Límite de registros a devolver',
    example: 10,
    required: true,
    type: Number,
  })
  @IsNotEmpty({ message: 'limit es requerido' })
  @IsNumber({}, { message: 'limit debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly limit: number

  @ApiProperty({
    description: 'Dirección del ordenamiento',
    example: 'DESC',
    required: true,
    enum: ['ASC', 'DESC'],
  })
  @IsNotEmpty({ message: 'orderByDirection es requerido' })
  @IsIn(['ASC', 'DESC'], {
    message: 'orderByDirection debe ser ASC o DESC',
  })
  @Transform(({ value }) => (value ? value.toUpperCase() : value))
  readonly orderByDirection: OrderByDirectionType
}

export class PackgingStatsFiltersDto {
  @ApiProperty({
    description: 'ID de la compañía para filtrar estadísticas',
    example: 1,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @ApiProperty({
    description: 'Fecha inicial para filtrar estadísticas',
    example: '2025-05-01',
    required: false,
    pattern: '^d{4}-d{2}-d{2}$',
  })
  @IsOptional()
  @IsString({ message: 'startDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe tener el formato yyyy-MM-DD',
  })
  readonly startDate?: string

  @ApiProperty({
    description: 'Fecha final para filtrar estadísticas',
    example: '2025-05-30',
    required: false,
    pattern: '^d{4}-d{2}-d{2}$',
  })
  @IsOptional()
  @IsString({ message: 'endDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe tener el formato yyyy-MM-DD',
  })
  readonly endDate?: string

  @ApiProperty({
    description: 'Dirección del ordenamiento',
    example: 'DESC',
    required: true,
    enum: ['ASC', 'DESC'],
  })
  @IsNotEmpty({ message: 'orderByDirection es requerido' })
  @IsIn(['ASC', 'DESC'], {
    message: 'orderByDirection debe ser ASC o DESC',
  })
  @Transform(({ value }) => (value ? value.toUpperCase() : value))
  readonly orderByDirection: OrderByDirectionType
}

export class PackingsPerDayDto {
  @ApiProperty({
    description: 'ID de la compañía para filtrar estadísticas',
    example: 1,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @ApiProperty({
    description: 'Fecha inicial para filtrar estadísticas',
    example: '2025-05-01',
    required: true,
    pattern: '^d{4}-d{2}-d{2}$',
  })
  @IsNotEmpty({ message: 'startDate es requerido' })
  @IsString({ message: 'startDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe tener el formato yyyy-MM-DD',
  })
  readonly startDate: string

  @ApiProperty({
    description: 'Fecha final para filtrar estadísticas',
    example: '2025-05-30',
    required: true,
    pattern: '^d{4}-d{2}-d{2}$',
  })
  @IsNotEmpty({ message: 'endDate es requerido' })
  @IsString({ message: 'endDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe tener el formato yyyy-MM-DD',
  })
  readonly endDate: string
}
