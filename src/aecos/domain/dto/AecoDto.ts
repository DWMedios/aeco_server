// import { Type } from 'class-transformer'
// import {
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   ValidateNested,
// } from 'class-validator'
import { AecoStatus } from '@common/infra/entities'
import {
  IAddress,
  ICompany,
  IPage,
  IRewardCategory,
  ITicket,
} from '@common/domain/entities'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateAecoDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string
  readonly status: AecoStatus
  readonly isOnline: boolean
  readonly initialSetup: boolean
  readonly needsUpdate: boolean

  @IsString()
  @IsNotEmpty()
  readonly serialNumber: string
  readonly currentCoords?: Record<string, any> | null
  readonly companyId?: number
  readonly addressId?: number
  readonly company?: ICompany | null
  readonly address?: IAddress | null
  readonly tickets?: ITicket[] | null

  @IsString()
  @IsOptional()
  readonly pages?: IPage[] | null
  readonly rewardCategories?: IRewardCategory[] | null
}
