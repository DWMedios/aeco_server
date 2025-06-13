import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { VALID_ASSET_TYPES, VALID_CONTENT_TYPES } from '@shared/utils/constants'

export class CreateMediaAssetDto {
  @ApiProperty({
    description: 'Clave única del archivo en el sistema de almacenamiento',
    example: 'company/logo/1234567890.jpg',
  })
  @IsNotEmpty({ message: 'La clave de la empresa no puede estar vacía' })
  @IsString({ message: 'La clave de la empresa debe ser una cadena de texto' })
  readonly fileKey: string

  @ApiProperty({
    description: 'Nombre original del archivo subido',
    example: 'logo-empresa.jpg',
  })
  @IsNotEmpty({
    message: 'El nombre original del archivo no puede estar vacío',
  })
  @IsString({
    message: 'El nombre original del archivo debe ser una cadena de texto',
  })
  readonly originalName: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'image/jpeg',
    enum: VALID_CONTENT_TYPES,
  })
  @IsNotEmpty({ message: 'El tipo de archivo es requerido' })
  @IsString({ message: 'El tipo de archivo debe ser una cadena de texto' })
  @IsIn(VALID_CONTENT_TYPES, {
    message: `El tipo de archivo no es válido. Tipos válidos: ${VALID_CONTENT_TYPES.join(', ')}`,
  })
  readonly mimeType: string

  @ApiPropertyOptional({
    description: 'Tamaño del archivo en bytes',
    example: 1024000,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El tamaño del archivo debe ser un número' })
  readonly fileSize?: number

  @ApiProperty({
    description: 'Tipo de activo multimedia',
    example: 'image',
    enum: VALID_ASSET_TYPES,
  })
  @IsNotEmpty({ message: 'El tipo de media es requerido' })
  @IsString({ message: 'El tipo de media debe ser una cadena de texto' })
  @IsIn(VALID_ASSET_TYPES, {
    message: `El tipo de media no es válido. Tipos válidos: ${VALID_ASSET_TYPES.join(', ')}`,
  })
  readonly assetType: string
}

export class UpdateMediaAssetDto {
  @ApiProperty({
    description: 'Clave única del archivo en el sistema de almacenamiento',
    example: 'company/logo/1234567890.jpg',
  })
  @IsNotEmpty({
    message: 'La clave de la empresa no puede estar vacía',
  })
  @IsString({ message: 'La clave de la empresa debe ser una cadena de texto' })
  readonly fileKey: string

  @ApiPropertyOptional({
    description: 'Nombre original del archivo subido',
    example: 'logo-empresa.jpg',
  })
  @IsOptional()
  @IsString({
    message: 'El nombre original del archivo debe ser una cadena de texto',
  })
  readonly originalName?: string

  @ApiPropertyOptional({
    description: 'Tipo MIME del archivo',
    example: 'image/jpeg',
    enum: VALID_CONTENT_TYPES,
  })
  @IsOptional()
  @IsString({ message: 'El tipo de archivo debe ser una cadena de texto' })
  @IsIn(VALID_CONTENT_TYPES, {
    message: `El tipo de archivo no es válido. Tipos válidos: ${VALID_CONTENT_TYPES.join(', ')}`,
  })
  readonly mimeType?: string

  @ApiPropertyOptional({
    description: 'Tamaño del archivo en bytes',
    example: 1024000,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El tamaño del archivo debe ser un número' })
  readonly fileSize?: number

  @ApiPropertyOptional({
    description: 'Tipo de activo multimedia',
    example: 'image',
    enum: VALID_ASSET_TYPES,
  })
  @IsOptional()
  @IsString({ message: 'El tipo de media debe ser una cadena de texto' })
  @IsIn(VALID_ASSET_TYPES, {
    message: `El tipo de media no es válido. Tipos válidos: ${VALID_ASSET_TYPES.join(', ')}`,
  })
  readonly assetType?: string
}
