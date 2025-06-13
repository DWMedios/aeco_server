import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({
    description: 'Nombre de la recompensa',
    example: 'Descuento 20% en Comidas',
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @ApiProperty({
    description: 'Tipo de recompensa',
    enum: RewardTypeEnum,
    example: RewardTypeEnum.DISCOUNT,
    required: true,
  })
  @IsNotEmpty({ message: 'El tipo es requerido' })
  @IsEnum(RewardTypeEnum, {
    message: 'El tipo no es válido',
  })
  readonly type: RewardTypeEnum

  @ApiProperty({
    description: 'Orden de visualización de la recompensa',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty({ message: 'El orden es requerido' })
  @IsNumber({}, { message: 'El orden debe ser un número' })
  readonly order: number

  @ApiProperty({
    description: 'ID de la compañía asociada a la recompensa',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty({ message: 'La compañía es requerida' })
  @IsNumber({}, { message: 'La compañía debe ser un número' })
  readonly companyId: number

  @ApiProperty({
    description: 'Información de imagen/media asociada a la recompensa',
    type: () => CreateMediaAssetDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaAssetDto)
  readonly mediaAsset?: CreateMediaAssetDto
}
