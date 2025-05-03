import { ApiProperty } from '@nestjs/swagger'
import { CreateUploadUrlResponse } from '@media-assets/domain/Types'

export class CreateUploadUrlResponseDto implements CreateUploadUrlResponse {
  @ApiProperty({
    description: 'Clave única que identifica el archivo en el almacenamiento',
    example: 'assets/images/profile/user-123/avatar.jpg',
  })
  key: string

  @ApiProperty({
    description: 'URL temporal para subir el archivo',
    example: 'https://storage-bucket.example.com/upload?token=abc123',
  })
  url: string

  @ApiProperty({
    description:
      'Cabeceras HTTP necesarias para realizar la subida del archivo',
    example: {
      'Content-Type': 'image/jpeg',
      'x-amz-acl': 'public-read',
    },
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  headers: Record<string, string>
}
