import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({
    description: 'Código único del producto (solo números)',
    example: '12345',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El código es requerido' })
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @Matches(/^[0-9]+$/, {
    message: 'El código debe contener solo números',
  })
  readonly code: string

  @ApiProperty({
    description: 'Familia o categoría a la que pertenece el producto',
    example: 'Electrónicos',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'La familia es requerida' })
  @IsString({ message: 'La familia debe ser una cadena de texto' })
  readonly family: string

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Smartphone XYZ',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @ApiProperty({
    description: 'ID de la capacidad asociada al producto',
    example: 1,
    type: Number,
    required: true,
  })
  @IsNotEmpty({ message: 'La capacidad es requerida' })
  @IsNumber({}, { message: 'La capacidad debe ser un número' })
  readonly capacityId: number
}
