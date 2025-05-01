import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { normalizeString } from '@shared/utils/functions'
import { BaseFiltersDto } from '@shared/domain/dto/Filters.dto'
import {
  OrderByFieldContractorType,
  OrderByFieldCampaignType,
  OrderByFieldAdvertisingType,
} from '@shared/domain/enums/Filters.enum'

export class ContractorFiltersDto extends BaseFiltersDto {
  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @IsOptional()
  @IsString({ message: 'email debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly email?: string

  @IsOptional()
  @IsString({ message: 'phone debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly phone?: string

  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @IsOptional()
  @IsIn(['createdAt', 'name', 'email', 'status', 'id'], {
    message: 'orderByField debe ser createdAt, name, email, status o id',
  })
  readonly orderByField?: OrderByFieldContractorType
}

export class CampaignFiltersDto extends BaseFiltersDto {
  @IsOptional()
  @IsString({ message: 'contractName debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly contractName?: string

  @IsOptional()
  @IsString({ message: 'description debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly description?: string

  @IsOptional()
  @IsString({ message: 'companyName debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly companyName?: string

  @IsOptional()
  @IsISO8601({}, { message: 'startDate debe ser una fecha válida' })
  readonly startDate?: string

  @IsOptional()
  @IsISO8601({}, { message: 'endDate debe ser una fecha válida' })
  readonly endDate?: string

  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly isEnabled?: boolean

  @IsOptional()
  @IsNumber({}, { message: 'contractorId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly contractorId?: number

  @IsOptional()
  @IsIn(
    ['createdAt', 'contractName', 'startDate', 'endDate', 'contractorId', 'id'],
    {
      message:
        'orderByField debe ser createdAt, contractName, startDate, endDate, contractorId o id',
    },
  )
  readonly orderByField?: OrderByFieldCampaignType
}

export class FilterCampaignByDateDto {
  @IsNotEmpty({ message: 'companyId es requerido' })
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId: number

  @IsNotEmpty({ message: 'startDate es requerido' })
  @IsISO8601({}, { message: 'startDate debe ser una fecha válida' })
  readonly startDate: string

  @IsNotEmpty({ message: 'endDate es requerido' })
  @IsISO8601({}, { message: 'endDate debe ser una fecha válida' })
  readonly endDate: string
}

export class FilterAdvertisingDto extends BaseFiltersDto {
  @IsOptional()
  @IsString({ message: 'companyName debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly companyName?: string

  @IsOptional()
  @IsBoolean({ message: 'isEnabled debe ser un booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly isEnabled?: boolean

  @IsOptional()
  @IsIn(['createdAt', 'id', 'companyName', 'isEnabled'], {
    message: 'orderByField debe ser createdAt, id, companyName o isEnabled',
  })
  readonly orderByField?: OrderByFieldAdvertisingType
}
