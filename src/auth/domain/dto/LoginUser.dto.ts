import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email es requerido' })
  @IsString({ message: 'Email debe ser un texto' })
  @IsEmail({}, { message: 'Email debe ser un correo válido' })
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @IsNotEmpty({ message: 'Contraseña es requerida' })
  @IsString({ message: 'Contraseña debe ser un texto alfanumérico' })
  readonly password: string
}
