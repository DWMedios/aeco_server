import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator'
import { CreateMediaAssetDto } from '@shared/domain/dto/Common.dto'

export class CreateCampaignDto {
  @ApiProperty({
    description: 'Nombre del contrato de la campaña',
    example: 'Campaña Verano 2025',
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'El nombre del contrato es requerido' })
  @IsString({ message: 'El nombre del contrato debe ser una cadena de texto' })
  @MaxLength(200, {
    message: 'El nombre del contrato no puede exceder los 200 caracteres',
  })
  readonly contractName: string

  @ApiProperty({
    description: 'Descripción de la campaña',
    example: 'Campaña de promoción para productos de verano',
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(200, {
    message: 'La descripción no puede exceder los 200 caracteres',
  })
  readonly description: string

  @ApiProperty({
    description: 'Fecha de inicio de la campaña (formato ISO)',
    example: '2025-06-01T00:00:00Z',
    type: Date,
  })
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  @IsISO8601({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  readonly startDate: Date

  @ApiProperty({
    description: 'Fecha de fin de la campaña (formato ISO)',
    example: '2025-08-31T23:59:59Z',
    type: Date,
  })
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  @IsISO8601({}, { message: 'La fecha de fin debe ser una fecha válida' })
  readonly endDate: Date

  @ApiPropertyOptional({
    description: 'Indica si la campaña está habilitada',
    default: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un valor booleano' })
  readonly isEnabled?: boolean

  @ApiPropertyOptional({
    description: 'ID del contratista asociado a la campaña',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El contractorId debe ser un número' })
  readonly contractorId?: number

  @ApiProperty({
    description: 'ID de la compañía a la que pertenece la campaña',
    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'El companyId es requerido' })
  @IsNumber({}, { message: 'El companyId debe ser un número' })
  readonly companyId: number

  @ApiPropertyOptional({
    description: 'Recurso multimedia asociado a la campaña',
    type: CreateMediaAssetDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaAssetDto)
  readonly mediaAsset?: CreateMediaAssetDto

  @ApiPropertyOptional({
    description: 'IDs de los AECOs asociados a la campaña',
    example: [1, 2, 3],
    type: [Number],
  })
  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un aeco' })
  readonly aecos?: number[]
}
