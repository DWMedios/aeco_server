import { IsNotEmpty, IsString } from 'class-validator'

export class BaseUploadDto {
  @IsString()
  @IsNotEmpty()
  readonly key: string
}
