import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
import { Type } from 'class-transformer'

export class UpdateLocationDto {
  @IsOptional()
  @IsString({ message: 'latitude debe ser una cadena de texto' })
  @IsLatitude({ message: 'latitude no es válido' })
  readonly latitude?: string

  @IsOptional()
  @IsString({ message: 'longitude debe ser una cadena de texto' })
  @IsLongitude({ message: 'longitude no es válido' })
  readonly longitude?: string
}

export class UpdateAecoDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name?: string

  @IsOptional()
  @IsEnum(AecoStatusEnum, {
    message: 'El status no es válido',
  })
  readonly status?: AecoStatusEnum

  @IsOptional()
  @IsString({ message: 'El número de serie debe ser una cadena de texto' })
  readonly serialNumber?: string

  @IsOptional()
  @Type(() => UpdateLocationDto)
  readonly currentCoords?: UpdateLocationDto

  @IsNumber({}, { message: 'El id de la compañía debe ser un número' })
  readonly companyId?: number
}
