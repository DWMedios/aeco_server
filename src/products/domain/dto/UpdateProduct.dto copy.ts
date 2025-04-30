import { IsNumber, IsOptional, IsString, Matches } from 'class-validator'

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @Matches(/^[0-9]+$/, {
    message: 'El código debe contener solo números',
  })
  readonly code?: string

  @IsOptional()
  @IsString({ message: 'La familia debe ser una cadena de texto' })
  readonly family?: string

  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name?: string

  @IsOptional()
  @IsNumber({}, { message: 'La capacidad debe ser un número' })
  readonly capacityId?: number
}
