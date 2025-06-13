import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProductCapacityDto {
  @ApiProperty({
    description: 'Tipo de empaque o presentación del producto',
    example: 'Caja',
    type: String,
    required: true,
  })
  @IsNotEmpty({ message: 'El empaque es requerido' })
  @IsString({ message: 'El empaque debe ser una cadena de texto' })
  readonly packaging: string

  @ApiProperty({
    description: 'Peso del producto en la unidad establecida',
    example: 1.5,
    type: Number,
    required: true,
  })
  @IsNotEmpty({ message: 'El peso es requerido' })
  @IsNumber({}, { message: 'El peso debe ser un número' })
  readonly weight: number

  @ApiProperty({
    description: 'Factor de conversión para cálculos',
    example: 12,
    type: Number,
    required: true,
  })
  @IsNotEmpty({ message: 'El factor es requerido' })
  @IsNumber({}, { message: 'El factor debe ser un número' })
  readonly factor: number

  @ApiProperty({
    description: 'Descripción adicional de la capacidad',
    example: 'Presentación estándar para retail',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  readonly description?: string
}
