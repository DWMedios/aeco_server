import { Transform, Type } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator'
import { IsNotInBlacklist } from '@shared/validators/email-blacklist.validator'
import { IsRFCValid } from '@shared/validators/is-rfc-valid.decorator'

export class CreateCompanyUserAdminDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  readonly password: string
}

export class CreateLegalRepresentativeDto {
  @IsNotEmpty({
    message: 'El nombre del representante legal no puede estar vacío',
  })
  @IsString({
    message: 'El nombre del representante legal debe ser una cadena de texto',
  })
  readonly name: string

  @IsNotEmpty({
    message: 'El email del representante legal no puede estar vacío',
  })
  @IsString({
    message: 'El email del representante legal debe ser una cadena de texto',
  })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @IsNotEmpty({
    message: 'El teléfono del representante legal no puede estar vacío',
  })
  @IsString({
    message: 'El teléfono de la empresa debe ser una cadena de texto',
  })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone: string

  @IsNotEmpty({
    message: 'El puesto del representante legal no puede estar vacía',
  })
  @IsString({
    message: 'El puesto del representante legal debe ser una cadena de texto',
  })
  readonly position: string
}

export class CreateSettingsDto {
  @IsNotEmpty({ message: 'La clave de la empresa no puede estar vacía' })
  @IsString({ message: 'La clave de la empresa debe ser una cadena de texto' })
  readonly key: string

  @IsOptional()
  readonly metadata?: Record<string, any>[] = []
}

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'El nombre de la empresa no puede estar vacío' })
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  readonly name: string

  @IsNotEmpty({ message: 'El RFC de la empresa no puede estar vacío' })
  @IsString({ message: 'El RFC de la empresa debe ser una cadena de texto' })
  @IsRFCValid()
  @Transform(({ value }) => value?.toUpperCase().trim())
  readonly rfc: string

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
  @ValidateNested()
  @Type(() => CreateLegalRepresentativeDto)
  readonly legalRepresentative?: CreateLegalRepresentativeDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSettingsDto)
  readonly settings?: CreateSettingsDto

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCompanyUserAdminDto)
  readonly userAdmin?: CreateCompanyUserAdminDto
}
