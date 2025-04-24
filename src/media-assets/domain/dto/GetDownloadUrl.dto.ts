import { IsNotEmpty, IsString } from 'class-validator'

export class GetDownloadUrlDto {
  @IsNotEmpty({ message: 'El key del archivo es requerido' })
  @IsString({ message: 'El key del archivo debe ser una cadena de texto' })
  readonly key: string
}
