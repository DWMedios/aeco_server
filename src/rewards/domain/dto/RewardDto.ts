import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateRewardDto {
  @IsString()
  name: string

  @IsString()
  image: string

  @IsNumber()
  order: number

  @IsOptional()
  @IsBoolean()
  status?: boolean

  @IsObject()
  metadata: Record<string, any>[]

  @IsNumber()
  aecoId: number
}
