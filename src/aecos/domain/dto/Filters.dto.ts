import { ApiProperty } from '@nestjs/swagger'
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
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
import { OrderByFieldAecoType } from '@shared/domain/enums/Filters.enum'
import { BaseFiltersDto } from '@shared/domain/dto/Filters.dto'

export class AecoFiltersDto extends BaseFiltersDto {
  @ApiProperty({
    description: 'Filtrar por folio del dispositivo AECO',
    example: 'AEC-001',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'folio debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly folio?: string

  @ApiProperty({
    description: 'Filtrar por número de serie del dispositivo AECO',
    example: 'AEC-2023-0001',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'serialNumber debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly serialNumber?: string

  @ApiProperty({
    description: 'Filtrar por ID de la compañía',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'companyId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly companyId?: number

  @ApiProperty({
    description: 'Filtrar por estado del dispositivo AECO',
    enum: AecoStatusEnum,
    example: AecoStatusEnum.ENABLED,
    required: false,
  })
  @IsOptional()
  @IsEnum(AecoStatusEnum, { message: 'status debe ser un estado válido' })
  readonly status?: AecoStatusEnum

  @ApiProperty({
    description: 'Filtrar por nombre del dispositivo AECO',
    example: 'Santa Fe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'name debe ser una cadena de texto' })
  @Transform(({ value }) =>
    value ? normalizeString(value.toLowerCase()) : value,
  )
  readonly name?: string

  @ApiProperty({
    description: 'Filtrar dispositivos AECO sin compañía asignada',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'withoutCompany debe ser un valor booleano' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly withoutCompany?: boolean

  @ApiProperty({
    description: 'Campo por el cual ordenar los resultados',
    enum: ['createdAt', 'name', 'folio', 'status', 'id'],
    example: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsIn(['createdAt', 'name', 'folio', 'status', 'id'], {
    message: 'orderByField debe ser createdAt, name, folio o status',
  })
  readonly orderByField?: OrderByFieldAecoType
}
