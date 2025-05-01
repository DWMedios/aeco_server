import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator'

export class CreateAdvertisingDto {
  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un valor booleano' })
  readonly isEnabled?: boolean

  @IsNotEmpty({ message: 'El companyId es requerido' })
  @IsNumber({}, { message: 'El companyId debe ser un número' })
  readonly companyId: number

  @IsOptional()
  @IsArray({ message: 'Los contractors deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los contractors deben ser números' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un contractor' })
  readonly contractors?: number[]

  @IsOptional()
  @IsArray({ message: 'Los campaigns deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los campaigns deben ser números' })
  @ArrayMinSize(1, { message: 'Debe haber al menos una campaña' })
  readonly campaigns?: number[]
}
