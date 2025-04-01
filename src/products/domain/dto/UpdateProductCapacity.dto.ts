import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductCapacityDto {
  @IsOptional()
  @IsString({ message: 'El empaque debe ser una cadena de texto' })
  readonly packaging?: string

  @IsOptional()
  @IsNumber({}, { message: 'El peso debe ser un número' })
  readonly weight?: number

  @IsOptional()
  @IsNumber({}, { message: 'El factor debe ser un número' })
  readonly factor?: number

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  readonly description?: string
}
