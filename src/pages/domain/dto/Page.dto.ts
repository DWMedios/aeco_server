import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreatePageDto {
  @ApiProperty({
    description: 'Nombre de la página',
    example: 'Página de inicio',
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre de la página es requerido' })
  @IsString({ message: 'El nombre de la página debe ser una cadena de texto' })
  @Transform(({ value }) => value?.trim())
  readonly name: string

  @ApiProperty({
    description: 'ID del AECO asociado a la página',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty({ message: 'El ID del AECO es requerido' })
  @IsNumber({}, { message: 'El ID del AECO debe ser un número' })
  readonly aecoId: number

  @ApiProperty({
    description: 'Metadatos adicionales de la página',
    required: false,
  })
  @IsOptional()
  @IsObject({ message: 'Los metadatos deben ser un objeto' })
  metadata?: Record<string, any>
}
