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
  @IsNotEmpty({ message: 'El nombre del contrato es requerido' })
  @IsString({ message: 'El nombre del contrato debe ser una cadena de texto' })
  @MaxLength(200, {
    message: 'El nombre del contrato no puede exceder los 200 caracteres',
  })
  readonly contractName: string

  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(200, {
    message: 'La descripción no puede exceder los 200 caracteres',
  })
  readonly description: string

  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  @IsISO8601({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  readonly startDate: Date

  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  @IsISO8601({}, { message: 'La fecha de fin debe ser una fecha válida' })
  readonly endDate: Date

  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un valor booleano' })
  readonly isEnabled?: boolean

  @IsOptional()
  @IsNumber({}, { message: 'El contractorId debe ser un número' })
  readonly contractorId?: number

  @IsNotEmpty({ message: 'El companyId es requerido' })
  @IsNumber({}, { message: 'El companyId debe ser un número' })
  readonly companyId: number

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaAssetDto)
  readonly mediaAsset?: CreateMediaAssetDto

  @IsOptional()
  @IsArray({ message: 'Los aecos deben ser un arreglo de números' })
  @IsNumber({}, { each: true, message: 'Los aecos deben ser números' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un aeco' })
  readonly aecos?: number[]
}
