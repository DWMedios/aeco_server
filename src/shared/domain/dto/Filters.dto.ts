import { Transform } from 'class-transformer'
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator'
import { normalizeString } from '@shared/utils/functions'
import { UserRoleEnum } from '@common/domain/enums/UserRole.enum'
import {
  OrderByDirectionType,
  OrderByFieldUserType,
  OrderByFieldCompanyType,
  OrderByFieldAecoType,
} from '../enums/Filters.enum'
import { PageOptionsDto } from '../pagination/dto/page-options.dto'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'

export class BaseFiltersDto extends PageOptionsDto {
  @IsOptional()
  @IsIn(['ASC', 'DESC'], {
    message: 'orderByDirection debe ser ASC o DESC',
  })
  @Transform(({ value }) => (value ? value.toUpperCase() : value))
  readonly orderByDirection?: OrderByDirectionType
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
  @IsIn(['createdAt', 'name', 'folio', 'status', 'id'], {
    message: 'orderByField debe ser createdAt, name, folio o status',
  })
  readonly orderByField?: OrderByFieldAecoType
}
