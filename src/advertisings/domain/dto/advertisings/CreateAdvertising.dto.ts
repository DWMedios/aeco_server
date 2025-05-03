import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator'

export class CreateAdvertisingDto {
  @ApiProperty({
    description: 'Indica si el anuncio está habilitado',
    required: false,
    default: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un valor booleano' })
  readonly isEnabled?: boolean

  @ApiProperty({
    description: 'ID de la compañía a la que pertenece el anuncio',
    required: true,
    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'El companyId es requerido' })
  @IsNumber({}, { message: 'El companyId debe ser un número' })
  readonly companyId: number

  @ApiProperty({
    description: 'Array de IDs de contratistas asociados al anuncio',
    required: false,
    example: [1, 2, 3],
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'Los contractors deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los contractors deben ser números' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un contractor' })
  readonly contractors?: number[]

  @ApiProperty({
    description: 'Array de IDs de campañas asociadas al anuncio',
    required: false,
    example: [1, 2, 3],
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'Los campaigns deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los campaigns deben ser números' })
  @ArrayMinSize(1, { message: 'Debe haber al menos una campaña' })
  readonly campaigns?: number[]
}
