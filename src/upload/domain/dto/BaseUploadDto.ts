import { IsString } from 'class-validator'

export class BaseUploadDto {
  @IsString()
  key: string
}
