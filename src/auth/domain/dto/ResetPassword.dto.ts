import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    example: 'NuevaPassword123!',
  })
  @IsNotEmpty({ message: 'Contraseña es requerida' })
  @IsString({ message: 'Contraseña debe ser un texto alfanumérico' })
  readonly password: string
}
