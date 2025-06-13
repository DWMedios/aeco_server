import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({
    description: 'Total de tickets generados en el día',
    example: 150,
    required: true,
  })
  @IsNotEmpty({ message: 'totalTickets es requerido' })
  @IsNumber({}, { message: 'totalTickets debe ser un número' })
  @Min(0, { message: 'totalTickets debe ser mayor o igual a 0' })
  readonly totalTickets: number

  @ApiProperty({
    description: 'Total de botellas recicladas en el día',
    example: 75,
    required: true,
  })
  @IsNotEmpty({ message: 'totalBottles es requerido' })
  @IsNumber({}, { message: 'totalBottles debe ser un número' })
  @Min(0, { message: 'totalBottles debe ser mayor o igual a 0' })
  readonly totalBottles: number

  @ApiProperty({
    description: 'Total de latas recicladas en el día',
    example: 120,
    required: true,
  })
  @IsNotEmpty({ message: 'totalCans es requerido' })
  @IsNumber({}, { message: 'totalCans debe ser un número' })
  @Min(0, { message: 'totalCans debe ser mayor o igual a 0' })
  readonly totalCans: number

  @ApiProperty({
    description: 'Fecha de creación de las estadísticas',
    example: '2023-05-15T14:30:00Z',
    required: true,
  })
  @IsNotEmpty({ message: 'createdAt es requerido' })
  @IsISO8601({}, { message: 'createdAt debe ser una fecha válida' })
  readonly createdAt: Date
}

export class ProductStatsDto {
  @ApiProperty({
    description: 'Total de unidades del producto recicladas',
    example: 35,
    required: true,
  })
  @IsNotEmpty({ message: 'totalCount es requerido' })
  @IsNumber({}, { message: 'totalCount debe ser un número' })
  @Min(0, { message: 'totalCount debe ser mayor o igual a 0' })
  readonly totalCount: number

  @ApiProperty({
    description: 'ID del producto',
    example: 42,
    required: true,
  })
  @IsNotEmpty({ message: 'productId es requerido' })
  @IsNumber({}, { message: 'productId debe ser un número' })
  readonly productId: number

  @ApiProperty({
    description: 'Fecha de creación de las estadísticas del producto',
    example: '2023-05-15T14:30:00Z',
    required: true,
  })
  @IsNotEmpty({ message: 'createdAt es requerido' })
  @IsISO8601({}, { message: 'createdAt debe ser una fecha válida' })
  readonly createdAt: Date
}

export class RequestProductStatsDto {
  @ApiProperty({
    description: 'Listado de estadísticas de productos',
    type: [ProductStatsDto],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductStatsDto)
  readonly stats: ProductStatsDto[]
}

export class PackagingStatsDto {
  @ApiProperty({
    description: 'Tipo de empaque reciclado',
    enum: ['bottle', 'can'],
    example: 'bottle',
    required: true,
  })
  @IsNotEmpty({ message: 'packagingType es requerido' })
  @IsIn(['bottle', 'can'], {
    message: 'packagingType debe ser "bottle" o "can"',
  })
  readonly packagingType: PackingType

  @ApiProperty({
    description: 'Total de unidades del tipo de empaque recicladas',
    example: 85,
    required: true,
  })
  @IsNotEmpty({ message: 'totalCount es requerido' })
  @IsNumber({}, { message: 'totalCount debe ser un número' })
  @Min(0, { message: 'totalCount debe ser mayor o igual a 0' })
  readonly totalCount: number

  @ApiProperty({
    description: 'Fecha de creación de las estadísticas de empaque',
    example: '2023-05-15T14:30:00Z',
    required: true,
  })
  @IsNotEmpty({ message: 'createdAt es requerido' })
  @IsISO8601({}, { message: 'createdAt debe ser una fecha válida' })
  readonly createdAt: Date
}

export class RequestPackagingStatsDto {
  @ApiProperty({
    description: 'Listado de estadísticas de empaques',
    type: [PackagingStatsDto],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PackagingStatsDto)
  readonly stats: PackagingStatsDto[]
}
