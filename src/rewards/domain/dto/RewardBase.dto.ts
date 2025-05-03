import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({
    description:
      'Nombre del establecimiento donde se puede reclamar la recompensa',
    example: 'Pizza Hut',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El establecimiento debe ser una cadena de texto' })
  readonly establishment?: string

  @ApiProperty({
    description: 'Descripción detallada de la recompensa',
    example:
      'Disfruta de un delicioso postre gratis con la compra de una pizza grande',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  readonly description?: string

  @ApiProperty({
    description: 'Nota adicional o información importante sobre la recompensa',
    example: 'Válido solo en días laborables',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La nota debe ser una cadena de texto' })
  readonly note?: string

  @ApiProperty({
    description: 'Estado de la recompensa (activa o inactiva)',
    example: true,
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  readonly status?: boolean

  @ApiProperty({
    description: 'Metadatos adicionales de la recompensa',
    example: [{ key: 'validez', value: '30 días' }],
    required: false,
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: { type: 'any' },
    },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>[]

  @ApiProperty({
    description: 'Lista de IDs de AECOs donde la recompensa estará disponible',
    example: [1, 2, 3],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un aeco' })
  readonly aecos?: number[]
}
