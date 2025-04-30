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
  @IsOptional()
  @IsString({
    message: 'El nombre del representante legal debe ser una cadena de texto',
  })
  readonly name?: string

  @IsOptional()
  @IsString({
    message: 'El email del representante legal debe ser una cadena de texto',
  })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email?: string

  @IsOptional()
  @IsString({
    message: 'El teléfono de la empresa debe ser una cadena de texto',
  })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone?: string

  @IsOptional()
  @IsString({
    message: 'El puesto del representante legal debe ser una cadena de texto',
  })
  readonly position?: string
}

export class UpdateCompanyDto {
  @IsOptional()
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  readonly name?: string

  @IsOptional()
  @IsString({ message: 'El RFC de la empresa debe ser una cadena de texto' })
  @IsRFCValid()
  @Transform(({ value }) => value?.toUpperCase().trim())
  readonly rfc?: string

  @IsOptional()
  @IsString({ message: 'El estado de la empresa debe ser una cadena de texto' })
  readonly state?: string

  @IsOptional()
  @IsString({ message: 'La ciudad de la empresa debe ser una cadena de texto' })
  readonly city?: string

  @IsOptional()
  @IsString({
    message: 'La dirección de la empresa debe ser una cadena de texto',
  })
  readonly address?: string

  @IsOptional()
  @IsString({
    message: 'El código postal de la empresa debe ser una cadena de texto',
  })
  readonly postalCode?: string

  @IsOptional()
  @IsString({
    message: 'El teléfono de la empresa debe ser una cadena de texto',
  })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone?: string

  @IsOptional()
  @IsBoolean({ message: 'El estatus de la empresa debe ser un booleano' })
  readonly status?: boolean

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLegalRepresentativeDto)
  readonly legalRepresentative?: UpdateLegalRepresentativeDto

  @IsOptional()
  @IsObject()
  readonly metadata?: Record<string, any>

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMediaAssetDto)
  readonly mediaAsset?: UpdateMediaAssetDto

  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  readonly aecos?: number[]
}
