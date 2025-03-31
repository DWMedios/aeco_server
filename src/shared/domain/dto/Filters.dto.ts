import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { normalizeString } from '@shared/utils/functions'
import { UserRoleEnum } from '@common/domain/enums/UserRole.enum'
import type {
  OrderByDirectionType,
  OrderByFieldUserType,
  OrderByFieldCompanyType,
  OrderByFieldAecoType,
  OrderByFieldRewardType,
  OrderByFieldProductType,
  OrderByFieldProductCapacityType,
} from '../enums/Filters.enum'
import { PageOptionsDto } from '../pagination/dto/page-options.dto'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
import { RewardTypeEnum } from '@common/domain/enums/RewardType.enum'

export class BaseFiltersDto extends PageOptionsDto {
  @IsOptional()
  @IsIn(['ASC', 'DESC'], {
    message: 'orderByDirection debe ser ASC o DESC',
  })
  @Transform(({ value }) => (value ? value.toUpperCase() : value))
  readonly orderByDirection?: OrderByDirectionType
}

export class ProductFiltersDto extends BaseFiltersDto {
  @IsOptional()
  @IsBoolean({ message: 'withCapacity debe ser un booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly withCapacity?: boolean

  @IsOptional()
  @IsString({ message: 'code debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly code?: string

  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @IsOptional()
  @IsString({ message: 'family debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly family?: string

  @IsOptional()
  @IsString({ message: 'description debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly description?: string

  @IsOptional()
  @IsNumber({}, { message: 'capacityId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly capacityId?: number

  @IsOptional()
  @IsIn(['createdAt', 'code', 'name', 'family', 'id'], {
    message: 'orderByField debe ser createdAt, code, name o family',
  })
  readonly orderByField?: OrderByFieldProductType
}

export class ProductCapacityFiltersDto extends BaseFiltersDto {
  @IsOptional()
  @IsString({ message: 'packaging debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly packaging?: string

  @IsOptional()
  @IsNumber({}, { message: 'weight debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly weight?: number

  @IsOptional()
  @IsNumber({}, { message: 'factor debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly factor?: number

  @IsOptional()
  @IsString({ message: 'description debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly description?: string

  @IsOptional()
  @IsIn(['createdAt', 'name', 'packaging', 'weight', 'factor', 'id'], {
    message:
      'orderByField debe ser createdAt, name, packaging, weight o factor',
  })
  readonly orderByField?: OrderByFieldProductCapacityType
}

export class RewardFiltersDto extends BaseFiltersDto {
  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @IsOptional()
  @IsString({ message: 'establishment debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly establishment?: string

  @IsOptional()
  @IsString({ message: 'description debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly description?: string

  @IsOptional()
  @IsString({ message: 'note debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly note?: string

  @IsOptional()
  @IsBoolean({ message: 'status debe ser un booleano' })
  readonly status?: boolean

  @IsOptional()
  @IsEnum(RewardTypeEnum, {
    message: 'type debe ser un tipo de recompensa válido',
  })
  readonly type?: RewardTypeEnum

  @IsOptional()
  @IsIn(['createdAt', 'name', 'order', 'status', 'establishment', 'id'], {
    message: 'orderByField debe ser createdAt, name, order, status o id',
  })
  readonly orderByField?: OrderByFieldRewardType
}

export class UserFiltersDto extends BaseFiltersDto {
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
  @IsEnum(UserRoleEnum, { message: 'role debe ser un rol válido' })
  readonly role?: UserRoleEnum

  @IsOptional()
  @IsIn(['createdAt', 'name', 'email', 'id'], {
    message: 'orderByField debe ser createdAt, name, email o id',
  })
  readonly orderByField?: OrderByFieldUserType
}

export class CompanyFiltersDto extends BaseFiltersDto {
  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @IsOptional()
  @IsString({ message: 'rfc debe ser una cadena de texto' })
  @Transform(({ value }) => value?.toUpperCase().trim())
  readonly rfc?: string

  @IsOptional()
  @IsString({ message: 'state debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly state?: string

  @IsOptional()
  @IsString({ message: 'city debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly city?: string

  @IsOptional()
  @IsString({ message: 'address debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly address?: string

  @IsOptional()
  @IsString({ message: 'postalCode debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly postalCode?: string

  @IsOptional()
  @IsString({ message: 'phone debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly phone?: string

  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un booleano' })
  readonly status?: boolean

  @IsOptional()
  @IsIn(
    ['createdAt', 'name', 'rfc', 'state', 'city', 'postalCode', 'phone', 'id'],
    {
      message:
        'orderByField debe ser createdAt, name, rfc, state, city, postalCode o phone',
    },
  )
  readonly orderByField?: OrderByFieldCompanyType
}
export class AecoFiltersDto extends BaseFiltersDto {
  @IsOptional()
  @IsString({ message: 'folio debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly folio?: string

  @IsOptional()
  @IsString({ message: 'serialNumber debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly serialNumber?: string

  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @IsOptional()
  @IsEnum(AecoStatusEnum, { message: 'status debe ser un estado válido' })
  readonly status?: AecoStatusEnum

  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @IsOptional()
  @IsBoolean({ message: 'withoutCompany debe ser un valor booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly withoutCompany?: boolean

  @IsOptional()
  @IsIn(['createdAt', 'name', 'folio', 'status', 'id'], {
    message: 'orderByField debe ser createdAt, name, folio o status',
  })
  readonly orderByField?: OrderByFieldAecoType
}
