import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsString } from 'class-validator'
import {
  VALID_ASSET_EXTENSIONS,
  VALID_ASSET_TYPES,
  VALID_CONTENT_TYPES,
} from '@shared/utils/constants'

export class CreateUploadUrlDto {
  @ApiProperty({
    description: 'Nombre del archivo a subir',
    example: 'perfil.jpg',
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre del archivo es requerido' })
  @IsString({ message: 'El nombre del archivo debe ser una cadena de texto' })
  fileName: string

  @ApiProperty({
    description: 'Tipo MIME del archivo',
    example: 'image/jpeg',
    enum: VALID_CONTENT_TYPES,
    required: true,
  })
  @IsNotEmpty({ message: 'El tipo de archivo es requerido' })
  @IsString({ message: 'El tipo de archivo debe ser una cadena de texto' })
  @IsIn(VALID_CONTENT_TYPES, {
    message: `El tipo de archivo no es válido. Tipos válidos: ${VALID_CONTENT_TYPES.join(', ')}`,
  })
  mimeType: string

  @ApiProperty({
    description: 'Tipo de asset multimedia',
    example: 'image',
    enum: VALID_ASSET_TYPES,
    required: true,
  })
  @IsNotEmpty({ message: 'El tipo de media es requerido' })
  @IsString({ message: 'El tipo de media debe ser una cadena de texto' })
  @IsIn(VALID_ASSET_TYPES, {
    message: `El tipo de media no es válido. Tipos válidos: ${VALID_ASSET_TYPES.join(', ')}`,
  })
  assetType: string

  @ApiProperty({
    description: 'Extensión del archivo',
    example: 'jpg',
    enum: VALID_ASSET_EXTENSIONS,
    required: true,
  })
  @IsNotEmpty({ message: 'La extensión del archivo es requerida' })
  @IsString({
    message: 'La extensión del archivo debe ser una cadena de texto',
  })
  @IsIn(VALID_ASSET_EXTENSIONS, {
    message: `La extensión del archivo no es válida. Extensiones válidas: ${VALID_ASSET_EXTENSIONS.join(', ')}`,
  })
  fileExtension: string
}
