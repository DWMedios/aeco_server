import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { RewardTypeEnum } from '@common/domain/enums/RewardType.enum'
import { UpdateMediaAssetDto } from '@shared/domain/dto/Common.dto'
import { BaseRewardDto } from './RewardBase.dto'

export class UpdateRewardDto extends BaseRewardDto {
  @ApiProperty({
    description: 'Nombre de la recompensa',
    example: 'Descuento 25% en Postres',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name?: string

  @ApiProperty({
    description: 'Tipo de recompensa',
    enum: RewardTypeEnum,
    example: RewardTypeEnum.DISCOUNT,
    required: false,
  })
  @IsOptional()
  @IsEnum(RewardTypeEnum, {
    message: 'El tipo no es válido',
  })
  readonly type?: RewardTypeEnum

  @ApiProperty({
    description: 'Orden de visualización de la recompensa',
    example: 2,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El orden debe ser un número' })
  readonly order?: number

  @ApiProperty({
    description: 'Lista de IDs de AECOs donde la recompensa estará disponible',
    example: [1, 3, 5],
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  readonly aecos?: number[]

  @ApiProperty({
    description:
      'Información de imagen/media asociada a la recompensa para actualizar',
    type: () => UpdateMediaAssetDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMediaAssetDto)
  readonly mediaAsset?: UpdateMediaAssetDto
}
