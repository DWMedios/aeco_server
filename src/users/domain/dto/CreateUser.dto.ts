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
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone: string

  @IsNotEmpty({ message: 'La posición es requerida' })
  @IsString({ message: 'La posición debe ser una cadena de texto' })
  readonly position: string

  @IsNotEmpty({ message: 'El estatus es requerido' })
  @IsBoolean({ message: 'El estatus debe ser un booleano' })
  readonly isActive: boolean

  @IsNotEmpty({ message: 'El rol es requerido' })
  @IsEnum(UserRoleEnum, {
    message: 'El rol no es válido',
  })
  readonly role: UserRoleEnum

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  readonly password: string

  @IsNotEmpty({ message: 'El id de la compañía es requerido' })
  @IsNumber({}, { message: 'El id de la compañía debe ser un número' })
  readonly companyId: number

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaAssetDto)
  readonly mediaAsset?: CreateMediaAssetDto
}
