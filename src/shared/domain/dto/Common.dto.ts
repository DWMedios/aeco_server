import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { VALID_ASSET_TYPES, VALID_CONTENT_TYPES } from '@shared/utils/constants'

export class CreateMediaAssetDto {
  @IsNotEmpty({ message: 'La clave de la empresa no puede estar vacía' })
  @IsString({ message: 'La clave de la empresa debe ser una cadena de texto' })
  readonly fileKey: string

  @IsNotEmpty({
    message: 'El nombre original del archivo no puede estar vacío',
  })
  @IsString({
    message: 'El nombre original del archivo debe ser una cadena de texto',
  })
  readonly originalName: string

  @IsNotEmpty({ message: 'El tipo de archivo es requerido' })
  @IsString({ message: 'El tipo de archivo debe ser una cadena de texto' })
  @IsIn(VALID_CONTENT_TYPES, {
    message: `El tipo de archivo no es válido. Tipos válidos: ${VALID_CONTENT_TYPES.join(', ')}`,
  })
  readonly mimeType: string

  @IsOptional()
  @IsNumber({}, { message: 'El tamaño del archivo debe ser un número' })
  readonly fileSize?: number

  @IsNotEmpty({ message: 'El tipo de media es requerido' })
  @IsString({ message: 'El tipo de media debe ser una cadena de texto' })
  @IsIn(VALID_ASSET_TYPES, {
    message: `El tipo de media no es válido. Tipos válidos: ${VALID_ASSET_TYPES.join(', ')}`,
  })
  readonly assetType: string
}

export class UpdateMediaAssetDto {
  @IsOptional()
  @IsString({ message: 'La clave de la empresa debe ser una cadena de texto' })
  readonly fileKey?: string

  @IsOptional()
  @IsString({
    message: 'El nombre original del archivo debe ser una cadena de texto',
  })
  readonly originalName?: string

  @IsOptional()
  @IsString({ message: 'El tipo de archivo debe ser una cadena de texto' })
  @IsIn(VALID_CONTENT_TYPES, {
    message: `El tipo de archivo no es válido. Tipos válidos: ${VALID_CONTENT_TYPES.join(', ')}`,
  })
  readonly mimeType?: string

  @IsOptional()
  @IsNumber({}, { message: 'El tamaño del archivo debe ser un número' })
  readonly fileSize?: number

  @IsOptional()
  @IsString({ message: 'El tipo de media debe ser una cadena de texto' })
  @IsIn(VALID_ASSET_TYPES, {
    message: `El tipo de media no es válido. Tipos válidos: ${VALID_ASSET_TYPES.join(', ')}`,
  })
  readonly assetType?: string
}
