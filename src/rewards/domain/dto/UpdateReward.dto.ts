import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { RewardTypeEnum } from '@common/domain/enums/RewardType.enum'
import { BaseRewardDto } from './RewardBase.dto'

export class UpdateRewardDto extends BaseRewardDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name?: string

  @IsOptional()
  @IsEnum(RewardTypeEnum, {
    message: 'El tipo no es válido',
  })
  readonly type?: RewardTypeEnum

  @IsOptional()
  @IsNumber({}, { message: 'El orden debe ser un número' })
  readonly order?: number

  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  readonly aecos?: number[]
}
