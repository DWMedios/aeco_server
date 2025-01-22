import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import type {
  IAddress,
  IPage,
  IRewardCategory,
  ITicket,
} from '@common/domain/entities'
import { AecoStatus } from '../enums/AecoStatus.enum'
import { Type } from 'class-transformer'
import { CreateSettingsDto } from '../../../company/domain/dto/CreateSettingsDto'

export class CreateAecoDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsEnum(AecoStatus, {
    message: 'status must be either enabled, disabled',
  })
  @IsNotEmpty()
  readonly status: AecoStatus

  @IsBoolean()
  readonly isOnline: boolean = false

  @IsBoolean()
  readonly initialSetup: boolean = false

  @IsBoolean()
  readonly needsUpdate: boolean = false

  @IsString()
  @IsNotEmpty()
  readonly serialNumber: string

  @IsOptional()
  readonly currentCoords?: Record<string, any> | null

  @IsNumber()
  readonly companyId: number

  @IsNumber()
  readonly addressId?: number

  @IsOptional()
  readonly tickets?: ITicket[] | null

  @IsOptional()
  readonly pages?: IPage[] | null

  @IsOptional()
  readonly rewardCategories?: IRewardCategory[] | null
}
