import { ApiProperty } from '@nestjs/swagger'

export class GetDownloadUrlResponseDto {
  @ApiProperty({
    description: 'URL temporal para descargar el archivo',
    example:
      'https://storage-bucket.example.com/assets/images/profile/user-123/avatar.jpg?token=xyz789',
    type: String,
  })
  url: string
}
