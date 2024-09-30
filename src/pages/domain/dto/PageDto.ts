import { IsNumber, IsString } from 'class-validator'

export class CreatePageDto {
  @IsString()
  name: string

  @IsString()
  metadata: string

  @IsNumber()
  aecoId: number
}
