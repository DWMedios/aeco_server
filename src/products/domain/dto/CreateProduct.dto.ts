import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty({ message: 'El código es requerido' })
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @Matches(/^[0-9]+$/, {
    message: 'El código debe contener solo números',
  })
  readonly code: string

  @IsNotEmpty({ message: 'La familia es requerida' })
  @IsString({ message: 'La familia debe ser una cadena de texto' })
  readonly family: string

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @IsNotEmpty({ message: 'La capacidad es requerida' })
  @IsNumber({}, { message: 'La capacidad debe ser un número' })
  readonly capacityId: number
}
