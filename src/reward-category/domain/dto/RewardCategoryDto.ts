import { IsNumber, IsString } from 'class-validator'

export class CreateRewardCategoryDto {
  @IsString()
  name: string

  @IsString()
  metadata: string

  @IsNumber()
  aecoId: number
}
