import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { AecoStatus } from '../enums/AecoStatus.enum'

export class UpdateAecoDto {
  @IsOptional()
  @IsString()
  readonly name?: string

  @IsOptional()
  @IsEnum(AecoStatus, {
    message: 'status must be either enabled, disabled',
  })
  readonly status?: AecoStatus

  @IsOptional()
  @IsBoolean()
  readonly isOnline?: boolean

  @IsOptional()
  @IsBoolean()
  readonly initialSetup?: boolean

  @IsOptional()
  @IsBoolean()
  readonly needsUpdate?: boolean

  @IsOptional()
  @IsString()
  readonly serialNumber?: string

  @IsOptional()
  readonly currentCoords?: Record<string, any> | null

  @IsOptional()
  @IsNumber()
  readonly addressId?: number

  @IsOptional()
  readonly pages?: null

  @IsOptional()
  readonly rewardCategories?: null

  @IsOptional()
  readonly metadata?: Record<string, any>
}
