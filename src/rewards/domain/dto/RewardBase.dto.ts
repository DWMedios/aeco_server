import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

export class BaseRewardDto {
  @IsOptional()
  @IsString({ message: 'El establecimiento debe ser una cadena de texto' })
  readonly establishment?: string

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  readonly description?: string

  @IsOptional()
  @IsString({ message: 'La nota debe ser una cadena de texto' })
  readonly note?: string

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  readonly status?: boolean

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>[]

  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un aeco' })
  readonly aecos?: number[]
}
