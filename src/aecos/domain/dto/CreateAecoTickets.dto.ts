import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'
import type { PackingType } from '@common/domain/Types'

export class CreateTicketItemDto {
  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(1, { message: 'La cantidad debe ser mayor a 0' })
  readonly quantity: number

  @IsNotEmpty({ message: 'El tipo de empaque es requerido' })
  @IsIn(['bottle', 'can'], {
    message: 'El tipo de empaque debe ser "bottle" o "can"',
  })
  readonly packagingType: PackingType

  @IsNotEmpty({ message: 'El producto es requerido' })
  @IsNumber({}, { message: 'El producto debe ser un número' })
  readonly productId: number
}

export class CreateTicketDto {
  @IsNotEmpty({ message: 'El folio es requerido' })
  @IsString({ message: 'El folio debe ser una cadena de texto' })
  readonly folio: string

  @IsNotEmpty({ message: 'El método es requerido' })
  @IsString({ message: 'El método debe ser una cadena de texto' })
  readonly method: string

  @IsOptional()
  @IsObject({ message: 'El resumen debe ser un objeto' })
  readonly summary?: Record<string, any>

  @IsNotEmpty({ message: 'El total de latas es requerido' })
  @IsNumber({}, { message: 'El total de latas debe ser un número' })
  @Min(0, { message: 'El total de latas debe ser mayor o igual a 0' })
  readonly totalCans: number

  @IsNotEmpty({ message: 'El total de botellas es requerido' })
  @IsNumber({}, { message: 'El total de botellas debe ser un número' })
  @Min(0, { message: 'El total de botellas debe ser mayor o igual a 0' })
  readonly totalBottles: number

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTicketItemDto)
  readonly items: CreateTicketItemDto[]
}

export class RequestCreateTicketsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTicketDto)
  readonly tickets: CreateTicketDto[]
}
