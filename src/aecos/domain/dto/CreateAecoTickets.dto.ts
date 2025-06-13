import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({
    description: 'Cantidad de productos reciclados',
    example: 5,
    required: true,
  })
  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(1, { message: 'La cantidad debe ser mayor a 0' })
  readonly quantity: number

  @ApiProperty({
    description: 'Tipo de empaque reciclado',
    enum: ['bottle', 'can'],
    example: 'bottle',
    required: true,
  })
  @IsNotEmpty({ message: 'El tipo de empaque es requerido' })
  @IsIn(['bottle', 'can'], {
    message: 'El tipo de empaque debe ser "bottle" o "can"',
  })
  readonly packagingType: PackingType

  @ApiProperty({
    description: 'ID del producto reciclado',
    example: 42,
    required: true,
  })
  @IsNotEmpty({ message: 'El producto es requerido' })
  @IsNumber({}, { message: 'El producto debe ser un número' })
  readonly productId: number
}

export class CreateTicketDto {
  @ApiProperty({
    description: 'Folio único del ticket',
    example: 'AECO-TICKET-001',
    required: true,
  })
  @IsNotEmpty({ message: 'El folio es requerido' })
  @IsString({ message: 'El folio debe ser una cadena de texto' })
  readonly folio: string

  @ApiProperty({
    description: 'Método de reciclaje utilizado',
    example: 'manual',
    required: true,
  })
  @IsNotEmpty({ message: 'El método es requerido' })
  @IsString({ message: 'El método debe ser una cadena de texto' })
  readonly method: string

  @ApiProperty({
    description: 'Resumen adicional del ticket',
    example: { points: 10, rewards: ['discount_code'] },
    required: false,
  })
  @IsOptional()
  @IsObject({ message: 'El resumen debe ser un objeto' })
  readonly summary?: Record<string, any>

  @ApiProperty({
    description: 'Total de latas recicladas en el ticket',
    example: 3,
    required: true,
  })
  @IsNotEmpty({ message: 'El total de latas es requerido' })
  @IsNumber({}, { message: 'El total de latas debe ser un número' })
  @Min(0, { message: 'El total de latas debe ser mayor o igual a 0' })
  readonly totalCans: number

  @ApiProperty({
    description: 'Total de botellas recicladas en el ticket',
    example: 2,
    required: true,
  })
  @IsNotEmpty({ message: 'El total de botellas es requerido' })
  @IsNumber({}, { message: 'El total de botellas debe ser un número' })
  @Min(0, { message: 'El total de botellas debe ser mayor o igual a 0' })
  readonly totalBottles: number

  @ApiProperty({
    description: 'Elementos reciclados detallados por producto y tipo',
    type: [CreateTicketItemDto],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTicketItemDto)
  readonly items: CreateTicketItemDto[]
}

export class RequestCreateTicketsDto {
  @ApiProperty({
    description: 'Listado de tickets a crear',
    type: [CreateTicketDto],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTicketDto)
  readonly tickets: CreateTicketDto[]
}
