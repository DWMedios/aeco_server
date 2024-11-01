import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { AecoStatus } from '../enums/AecoStatus.enum'

export class UpdateAecoDto {
  @IsString()
  @IsOptional()
  readonly name?: string

  @IsEnum(AecoStatus, {
    message: 'status must be either enabled, disabled',
  })
  @IsOptional()
  readonly status?: AecoStatus

  @IsBoolean()
  @IsOptional()
  readonly isOnline?: boolean

  @IsBoolean()
  @IsOptional()
  readonly initialSetup?: boolean

  @IsBoolean()
  @IsOptional()
  readonly needsUpdate?: boolean

  @IsString()
  @IsOptional()
  readonly serialNumber?: string

  @IsOptional()
  readonly currentCoords?: Record<string, any> | null

  @IsNumber()
  @IsOptional()
  readonly companyId?: number

  @IsOptional()
  readonly address?: null

  @IsOptional()
  readonly tickets?: null

  @IsOptional()
  readonly pages?: null

  @IsOptional()
  readonly rewardCategories?: null
}
