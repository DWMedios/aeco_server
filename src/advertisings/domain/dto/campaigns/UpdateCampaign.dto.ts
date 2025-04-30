import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsOptional,
  IsNumber,
  IsString,
  ValidateNested,
  MaxLength,
  IsISO8601,
  IsArray,
} from 'class-validator'
import { UpdateMediaAssetDto } from '@shared/domain/dto/Common.dto'

export class UpdateCampaignDto {
  @IsOptional()
  @IsString({ message: 'El nombre del contrato debe ser una cadena de texto' })
  @MaxLength(200, {
    message: 'El nombre del contrato no puede exceder los 200 caracteres',
  })
  readonly contractName?: string

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(200, {
    message: 'La descripción no puede exceder los 200 caracteres',
  })
  readonly description?: string

  @IsOptional()
  @IsISO8601({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  readonly startDate?: Date

  @IsOptional()
  @IsISO8601({}, { message: 'La fecha de fin debe ser una fecha válida' })
  readonly endDate?: Date

  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un valor booleano' })
  readonly isEnabled?: boolean

  @IsOptional()
  @IsNumber({}, { message: 'El contractorId debe ser un número' })
  readonly contractorId?: number

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMediaAssetDto)
  readonly mediaAsset?: UpdateMediaAssetDto

  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  readonly aecos?: number[]
}
