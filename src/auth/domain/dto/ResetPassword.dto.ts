import { IsNotEmpty, IsString } from 'class-validator'

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Contraseña es requerida' })
  @IsString({ message: 'Contraseña debe ser un texto alfanumérico' })
  readonly password: string
}
