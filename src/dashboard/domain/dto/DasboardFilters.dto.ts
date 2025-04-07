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
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @IsOptional()
  @IsString({ message: 'startDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe tener el formato yyyy-MM-DD',
  })
  readonly startDate?: string

  @IsOptional()
  @IsString({ message: 'endDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe tener el formato yyyy-MM-DD',
  })
  readonly endDate?: string
}

export class TopStatsFiltersDto {
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @IsNotEmpty({ message: 'limit es requerido' })
  @IsNumber({}, { message: 'limit debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly limit: number

  @IsNotEmpty({ message: 'orderByDirection es requerido' })
  @IsIn(['ASC', 'DESC'], {
    message: 'orderByDirection debe ser ASC o DESC',
  })
  @Transform(({ value }) => (value ? value.toUpperCase() : value))
  readonly orderByDirection: OrderByDirectionType
}
export class PackgingStatsFiltersDto {
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @IsOptional()
  @IsString({ message: 'startDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe tener el formato yyyy-MM-DD',
  })
  readonly startDate?: string

  @IsOptional()
  @IsString({ message: 'endDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe tener el formato yyyy-MM-DD',
  })
  readonly endDate?: string
}

export class PackingsPerDayDto {
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @IsNotEmpty({ message: 'startDate es requerido' })
  @IsString({ message: 'startDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'startDate debe tener el formato yyyy-MM-DD',
  })
  readonly startDate: string

  @IsNotEmpty({ message: 'endDate es requerido' })
  @IsString({ message: 'endDate debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'endDate debe tener el formato yyyy-MM-DD',
  })
  readonly endDate: string
}
