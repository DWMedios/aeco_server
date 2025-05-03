import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator'
import { IsNotInBlacklist } from '@shared/validators/email-blacklist.validator'
import { UserRoleEnum } from '@common/domain/enums/UserRole.enum'
import { UpdateMediaAssetDto } from '@shared/domain/dto/Common.dto'

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name?: string

  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email?: string

  @ApiPropertyOptional({
    description: 'Número de teléfono del usuario (10 dígitos)',
    example: '5512345678',
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone?: string

  @ApiPropertyOptional({
    description: 'Posición o cargo del usuario en la empresa',
    example: 'Gerente de Ventas',
  })
  @IsOptional()
  @IsString({ message: 'La posición debe ser una cadena de texto' })
  readonly position?: string

  @ApiPropertyOptional({
    description: 'Estado activo/inactivo del usuario',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El estatus debe ser un booleano' })
  readonly isActive?: boolean

  @ApiPropertyOptional({
    description: 'Rol del usuario en el sistema',
    enum: UserRoleEnum,
    example: 'admin',
  })
  @IsOptional()
  @IsEnum(UserRoleEnum, {
    message: 'El rol no es válido',
  })
  readonly role?: UserRoleEnum

  @ApiPropertyOptional({
    description: 'ID de la compañía a la que pertenece el usuario',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El id de la compañía debe ser un número' })
  readonly companyId?: number

  @ApiPropertyOptional({
    description: 'Información del activo multimedia asociado al usuario',
    type: UpdateMediaAssetDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMediaAssetDto)
  readonly mediaAsset?: UpdateMediaAssetDto
}
