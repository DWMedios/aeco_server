import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator'
import { IsNotInBlacklist } from '@shared/validators/email-blacklist.validator'
import { UserRoleEnum } from '@common/domain/enums/UserRole.enum'

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name?: string

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email?: string

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone?: string

  @IsOptional()
  @IsString({ message: 'La posición debe ser una cadena de texto' })
  readonly position?: string

  @IsOptional()
  @IsBoolean({ message: 'El estatus debe ser un booleano' })
  readonly isActive?: boolean

  @IsOptional()
  @IsEnum(UserRoleEnum, {
    message: 'El rol no es válido',
  })
  readonly role?: UserRoleEnum

  @IsOptional()
  @IsNumber({}, { message: 'El id de la compañía debe ser un número' })
  readonly companyId?: number
}
