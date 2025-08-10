import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { IsNotInBlacklist } from '@shared/validators/email-blacklist.validator'

export class ForgotPasswordDto {
  @ApiProperty({ example: 'example@ayuntaeco.com' })
  @IsNotEmpty({ message: 'Email es requerido' })
  @IsString({ message: 'Email debe ser una cadena de texto' })
  @IsEmail({}, { message: 'Email no es válido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string
}
