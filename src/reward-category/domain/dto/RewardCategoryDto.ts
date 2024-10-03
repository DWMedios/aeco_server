import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateRewardCategoryDto {
  @IsString()
  name: string

  @IsOptional()
  @IsBoolean()
  status?: boolean

  @IsNumber()
  order: number

  @IsNumber()
  aecoId: number
}
