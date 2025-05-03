import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator'
import { IsNotInBlacklist } from '@shared/validators/email-blacklist.validator'
import { IsRFCValid } from '@shared/validators/is-rfc-valid.decorator'
import { UpdateMediaAssetDto } from '@shared/domain/dto/Common.dto'

export class UpdateLegalRepresentativeDto {
  @ApiPropertyOptional({
    description: 'Nombre del representante legal',
    example: 'Jane Smith',
  })
  @IsOptional()
  @IsString({
    message: 'El nombre del representante legal debe ser una cadena de texto',
  })
  readonly name?: string

  @ApiPropertyOptional({
    description: 'Correo electrónico del representante legal',
    example: 'legal@empresa.com',
  })
  @IsOptional()
  @IsString({
    message: 'El email del representante legal debe ser una cadena de texto',
  })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email?: string

  @ApiPropertyOptional({
    description: 'Teléfono del representante legal',
    example: '9991234567',
  })
  @IsOptional()
  @IsString({
    message: 'El teléfono de la empresa debe ser una cadena de texto',
  })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone?: string

  @ApiPropertyOptional({
    description: 'Puesto del representante legal',
    example: 'Director General',
  })
  @IsOptional()
  @IsString({
    message: 'El puesto del representante legal debe ser una cadena de texto',
  })
  readonly position?: string
}

export class UpdateCompanyDto {
  @ApiPropertyOptional({
    description: 'Nombre de la empresa',
    example: 'Empresa S.A. de C.V.',
  })
  @IsOptional()
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  readonly name?: string

  @ApiPropertyOptional({
    description: 'RFC de la empresa (formato válido)',
    example: 'EMP010101ABC',
  })
  @IsOptional()
  @IsString({ message: 'El RFC de la empresa debe ser una cadena de texto' })
  @IsRFCValid()
  @Transform(({ value }) => value?.toUpperCase().trim())
  readonly rfc?: string

  @ApiPropertyOptional({
    description: 'Estado donde se encuentra la empresa',
    example: 'Yucatán',
  })
  @IsOptional()
  @IsString({ message: 'El estado de la empresa debe ser una cadena de texto' })
  readonly state?: string

  @ApiPropertyOptional({
    description: 'Ciudad donde se encuentra la empresa',
    example: 'Mérida',
  })
  @IsOptional()
  @IsString({ message: 'La ciudad de la empresa debe ser una cadena de texto' })
  readonly city?: string

  @ApiPropertyOptional({
    description: 'Dirección de la empresa',
    example: 'Calle 60 x 59 y 61, Centro',
  })
  @IsOptional()
  @IsString({
    message: 'La dirección de la empresa debe ser una cadena de texto',
  })
  readonly address?: string

  @ApiPropertyOptional({
    description: 'Código postal de la empresa',
    example: '97000',
  })
  @IsOptional()
  @IsString({
    message: 'El código postal de la empresa debe ser una cadena de texto',
  })
  readonly postalCode?: string

  @ApiPropertyOptional({
    description: 'Teléfono de la empresa (10 dígitos)',
    example: '9991234567',
  })
  @IsOptional()
  @IsString({
    message: 'El teléfono de la empresa debe ser una cadena de texto',
  })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone?: string

  @ApiPropertyOptional({
    description: 'Estado activo/inactivo de la empresa',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El estatus de la empresa debe ser un booleano' })
  readonly status?: boolean

  @ApiPropertyOptional({
    description: 'Información actualizada del representante legal',
    type: UpdateLegalRepresentativeDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLegalRepresentativeDto)
  readonly legalRepresentative?: UpdateLegalRepresentativeDto

  @ApiPropertyOptional({
    description: 'Metadatos adicionales de la empresa',
    example: { industry: 'Tecnología', employees: 100 },
  })
  @IsOptional()
  @IsObject()
  readonly metadata?: Record<string, any>

  @ApiPropertyOptional({
    description: 'Información del activo multimedia (logo) a actualizar',
    type: UpdateMediaAssetDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMediaAssetDto)
  readonly mediaAsset?: UpdateMediaAssetDto

  @ApiPropertyOptional({
    description: 'IDs de dispositivos AECO asociados a la empresa',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  readonly aecos?: number[]
}
