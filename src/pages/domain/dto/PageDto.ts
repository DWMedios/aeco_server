import { IsNumber, IsObject, IsString } from 'class-validator'

export class CreatePageDto {
  @IsString()
  name: string

  @IsNumber()
  aecoId: number

  @IsObject()
  metadata: Record<string, any>
}
