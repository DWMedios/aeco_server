import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
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
import { CreateMediaAssetDto } from '@shared/domain/dto/Common.dto'

export class CreateCompanyUserAdminDto {
  @ApiProperty({
    description: 'Nombre del administrador de la empresa',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @ApiProperty({
    description: 'Correo electrónico del administrador',
    example: 'admin@empresa.com',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @ApiProperty({
    description: 'Contraseña del administrador',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  readonly password: string
}

export class CreateLegalRepresentativeDto {
  @ApiProperty({
    description: 'Nombre del representante legal',
    example: 'Jane Smith',
  })
  @IsNotEmpty({
    message: 'El nombre del representante legal no puede estar vacío',
  })
  @IsString({
    message: 'El nombre del representante legal debe ser una cadena de texto',
  })
  readonly name: string

  @ApiProperty({
    description: 'Correo electrónico del representante legal',
    example: 'legal@empresa.com',
  })
  @IsNotEmpty({
    message: 'El email del representante legal no puede estar vacío',
  })
  @IsString({
    message: 'El email del representante legal debe ser una cadena de texto',
  })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @ApiProperty({
    description: 'Teléfono del representante legal',
    example: '9991234567',
  })
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

  @ApiProperty({
    description: 'Puesto del representante legal',
    example: 'Director General',
  })
  @IsNotEmpty({
    message: 'El puesto del representante legal no puede estar vacía',
  })
  @IsString({
    message: 'El puesto del representante legal debe ser una cadena de texto',
  })
  readonly position: string
}

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'Empresa S.A. de C.V.',
  })
  @IsNotEmpty({ message: 'El nombre de la empresa no puede estar vacío' })
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  readonly name: string

  @ApiProperty({
    description: 'RFC de la empresa (formato válido)',
    example: 'EMP010101ABC',
  })
  @IsNotEmpty({ message: 'El RFC de la empresa no puede estar vacío' })
  @IsString({ message: 'El RFC de la empresa debe ser una cadena de texto' })
  @IsRFCValid()
  @Transform(({ value }) => value?.toUpperCase().trim())
  readonly rfc: string

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
    description: 'Información del representante legal',
    type: CreateLegalRepresentativeDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLegalRepresentativeDto)
  readonly legalRepresentative?: CreateLegalRepresentativeDto

  @ApiPropertyOptional({
    description: 'Metadatos adicionales de la empresa',
    example: { industry: 'Tecnología', employees: 100 },
  })
  @IsOptional()
  @IsObject()
  readonly metadata?: Record<string, any>

  @ApiPropertyOptional({
    description: 'Información del activo multimedia (logo)',
    type: CreateMediaAssetDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaAssetDto)
  readonly mediaAsset?: CreateMediaAssetDto

  @ApiPropertyOptional({
    description: 'Información del usuario administrador inicial',
    type: CreateCompanyUserAdminDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCompanyUserAdminDto)
  readonly userAdmin?: CreateCompanyUserAdminDto

  @ApiPropertyOptional({
    description: 'IDs de dispositivos AECO asociados a la empresa',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un aeco' })
  readonly aecos?: number[]
}
