import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
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
import { BaseFiltersDto } from '@shared/domain/dto/Filters.dto'
import { OrderByFieldUserType } from '@shared/domain/enums/Filters.enum'

export class UserFiltersDto extends BaseFiltersDto {
  @ApiPropertyOptional({
    description: 'Filtrar usuarios por nombre',
    example: 'juan',
  })
  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @ApiPropertyOptional({
    description: 'Filtrar usuarios por email',
    example: 'juan.perez@example.com',
  })
  @IsOptional()
  @IsString({ message: 'email debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly email?: string

  @ApiPropertyOptional({
    description: 'Filtrar usuarios por rol',
    enum: UserRoleEnum,
    example: 'admin',
  })
  @IsOptional()
  @IsEnum(UserRoleEnum, { message: 'role debe ser un rol válido' })
  readonly role?: UserRoleEnum

  @ApiPropertyOptional({
    description: 'Campo para ordenar resultados',
    enum: ['createdAt', 'name', 'email', 'id'],
    example: 'name',
  })
  @IsOptional()
  @IsIn(['createdAt', 'name', 'email', 'id'], {
    message: 'orderByField debe ser createdAt, name, email o id',
  })
  readonly orderByField?: OrderByFieldUserType

  @ApiPropertyOptional({
    description: 'Filtrar por estado activo/inactivo',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly isActive?: boolean

  @ApiProperty({
    description: 'Filtrar por ID de la compañía',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number
}
