import { ApiPropertyOptional } from '@nestjs/swagger'
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
  @ApiPropertyOptional({
    description: 'Nombre del contrato de la campaña',
    example: 'Campaña Verano 2025 Actualizada',
    maxLength: 200,
  })
  @IsOptional()
  @IsString({ message: 'El nombre del contrato debe ser una cadena de texto' })
  @MaxLength(200, {
    message: 'El nombre del contrato no puede exceder los 200 caracteres',
  })
  readonly contractName?: string

  @ApiPropertyOptional({
    description: 'Descripción de la campaña',
    example: 'Campaña de promoción actualizada para productos de verano',
    maxLength: 200,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(200, {
    message: 'La descripción no puede exceder los 200 caracteres',
  })
  readonly description?: string

  @ApiPropertyOptional({
    description: 'Fecha de inicio de la campaña (formato ISO)',
    example: '2025-06-15T00:00:00Z',
    type: Date,
  })
  @IsOptional()
  @IsISO8601({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  readonly startDate?: Date

  @ApiPropertyOptional({
    description: 'Fecha de fin de la campaña (formato ISO)',
    example: '2025-09-15T23:59:59Z',
    type: Date,
  })
  @IsOptional()
  @IsISO8601({}, { message: 'La fecha de fin debe ser una fecha válida' })
  readonly endDate?: Date

  @ApiPropertyOptional({
    description: 'Indica si la campaña está habilitada',
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un valor booleano' })
  readonly isEnabled?: boolean

  @ApiPropertyOptional({
    description: 'ID del contratista asociado a la campaña',
    example: 2,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El contractorId debe ser un número' })
  readonly contractorId?: number

  @ApiPropertyOptional({
    description: 'Recurso multimedia asociado a la campaña',
    type: UpdateMediaAssetDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMediaAssetDto)
  readonly mediaAsset?: UpdateMediaAssetDto

  @ApiPropertyOptional({
    description: 'IDs de los AECOs asociados a la campaña',
    example: [1, 2, 4],
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  readonly aecos?: number[]
}
