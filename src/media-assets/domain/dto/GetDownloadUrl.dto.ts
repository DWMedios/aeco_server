import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GetDownloadUrlDto {
  @ApiProperty({
    description: 'Clave única que identifica el archivo en el almacenamiento',
    example: 'assets/images/profile/user-123/avatar.jpg',
    required: true,
  })
  @IsNotEmpty({ message: 'El key del archivo es requerido' })
  @IsString({ message: 'El key del archivo debe ser una cadena de texto' })
  readonly key: string
}
