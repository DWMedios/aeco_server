import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProductCapacityDto {
  @IsNotEmpty({ message: 'El empaque es requerido' })
  @IsString({ message: 'El empaque debe ser una cadena de texto' })
  readonly packaging: string

  @IsNotEmpty({ message: 'El peso es requerido' })
  @IsNumber({}, { message: 'El peso debe ser un número' })
  readonly weight: number

  @IsNotEmpty({ message: 'El factor es requerido' })
  @IsNumber({}, { message: 'El factor debe ser un número' })
  readonly factor: number

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  readonly description?: string
}
