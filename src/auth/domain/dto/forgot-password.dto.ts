import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { IsNotInBlacklist } from '@shared/validators/email-blacklist.validator'
import { I18nValidationMessage } from '@shared/validators/i18n-validation-message'

export class ForgotPasswordDto {
  @ApiProperty({ example: 'example@ayuntaeco.com' })
  @IsNotEmpty({ message: I18nValidationMessage('validation.NOT_EMPTY') })
  @IsString({ message: I18nValidationMessage('validation.IS_STRING') })
  @IsEmail({}, { message: I18nValidationMessage('validation.IS_EMAIL') })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string
}
