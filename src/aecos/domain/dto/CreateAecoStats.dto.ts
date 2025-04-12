import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsISO8601,
  IsIn,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator'
import { PackingType } from '@common/domain/Types'

export class CreateDailyStatsDto {
  @IsNotEmpty({ message: 'totalTickets es requerido' })
  @IsNumber({}, { message: 'totalTickets debe ser un número' })
  @Min(0, { message: 'totalTickets debe ser mayor o igual a 0' })
  readonly totalTickets: number

  @IsNotEmpty({ message: 'totalBottles es requerido' })
  @IsNumber({}, { message: 'totalBottles debe ser un número' })
  @Min(0, { message: 'totalBottles debe ser mayor o igual a 0' })
  readonly totalBottles: number

  @IsNotEmpty({ message: 'totalCans es requerido' })
  @IsNumber({}, { message: 'totalCans debe ser un número' })
  @Min(0, { message: 'totalCans debe ser mayor o igual a 0' })
  readonly totalCans: number

  @IsNotEmpty({ message: 'createdAt es requerido' })
  @IsISO8601({}, { message: 'createdAt debe ser una fecha válida' })
  readonly createdAt: Date
}

export class ProductStatsDto {
  @IsNotEmpty({ message: 'totalCount es requerido' })
  @IsNumber({}, { message: 'totalCount debe ser un número' })
  @Min(0, { message: 'totalCount debe ser mayor o igual a 0' })
  readonly totalCount: number

  @IsNotEmpty({ message: 'productId es requerido' })
  @IsNumber({}, { message: 'productId debe ser un número' })
  readonly productId: number

  @IsNotEmpty({ message: 'createdAt es requerido' })
  @IsISO8601({}, { message: 'createdAt debe ser una fecha válida' })
  readonly createdAt: Date
}

export class RequestProductStatsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductStatsDto)
  readonly stats: ProductStatsDto[]
}

export class PackagingStatsDto {
  @IsNotEmpty({ message: 'packagingType es requerido' })
  @IsIn(['bottle', 'can'], {
    message: 'packagingType debe ser "bottle" o "can"',
  })
  readonly packagingType: PackingType

  @IsNotEmpty({ message: 'totalCount es requerido' })
  @IsNumber({}, { message: 'totalCount debe ser un número' })
  @Min(0, { message: 'totalCount debe ser mayor o igual a 0' })
  readonly totalCount: number

  @IsNotEmpty({ message: 'createdAt es requerido' })
  @IsISO8601({}, { message: 'createdAt debe ser una fecha válida' })
  readonly createdAt: Date
}

export class RequestPackagingStatsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PackagingStatsDto)
  readonly stats: PackagingStatsDto[]
}
