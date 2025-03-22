import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { RewardTypeEnum } from '@common/domain/enums/RewardType.enum'
import { BaseRewardDto } from './RewardBase.dto'

export class CreateRewardDto extends BaseRewardDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @IsNotEmpty({ message: 'El tipo es requerido' })
  @IsEnum(RewardTypeEnum, {
    message: 'El tipo no es válido',
  })
  readonly type: RewardTypeEnum

  @IsNotEmpty({ message: 'El orden es requerido' })
  @IsNumber({}, { message: 'El orden debe ser un número' })
  readonly order: number
}
