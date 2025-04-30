import { Type } from 'class-transformer'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { RewardTypeEnum } from '@common/domain/enums/RewardType.enum'
import { CreateMediaAssetDto } from '@shared/domain/dto/Common.dto'
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

  @IsNotEmpty({ message: 'La compañía es requerida' })
  @IsNumber({}, { message: 'La compañía debe ser un número' })
  readonly companyId: number

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaAssetDto)
  readonly mediaAsset?: CreateMediaAssetDto
}
