import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator'
import { IsNotInBlacklist } from '@shared/validators/email-blacklist.validator'
import { UserRoleEnum } from '@common/domain/enums/UserRole.enum'
import { CreateMediaAssetDto } from '@shared/domain/dto/Common.dto'

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @ApiProperty({
    description: 'Número de teléfono del usuario (10 dígitos)',
    example: '5512345678',
  })
  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone: string

  @ApiProperty({
    description: 'Posición o cargo del usuario en la empresa',
    example: 'Gerente de Ventas',
  })
  @IsNotEmpty({ message: 'La posición es requerida' })
  @IsString({ message: 'La posición debe ser una cadena de texto' })
  readonly position: string

  @ApiProperty({
    description: 'Estado activo/inactivo del usuario',
    example: true,
  })
  @IsNotEmpty({ message: 'El estatus es requerido' })
  @IsBoolean({ message: 'El estatus debe ser un booleano' })
  readonly isActive: boolean

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    enum: UserRoleEnum,
    example: 'admin',
  })
  @IsNotEmpty({ message: 'El rol es requerido' })
  @IsEnum(UserRoleEnum, {
    message: 'El rol no es válido',
  })
  readonly role: UserRoleEnum

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  readonly password: string

  @ApiProperty({
    description: 'ID de la compañía a la que pertenece el usuario',
    example: 1,
  })
  @IsNotEmpty({ message: 'El id de la compañía es requerido' })
  @IsNumber({}, { message: 'El id de la compañía debe ser un número' })
  readonly companyId: number

  @ApiProperty({
    description:
      'Información del activo multimedia asociado al usuario (opcional)',
    required: false,
    type: CreateMediaAssetDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaAssetDto)
  readonly mediaAsset?: CreateMediaAssetDto
}
