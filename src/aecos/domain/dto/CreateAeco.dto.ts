import { Type } from 'class-transformer'
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'

export class CreateLocationDto {
  @IsNotEmpty({ message: 'latitude es requerido' })
  @IsString({ message: 'latitude debe ser una cadena de texto' })
  @IsLatitude({ message: 'latitude no es válido' })
  readonly latitude: string

  @IsNotEmpty({ message: 'longitude es requerido' })
  @IsString({ message: 'longitude debe ser una cadena de texto' })
  @IsLongitude({ message: 'longitude no es válido' })
  readonly longitude: string
}

export class CreateAecoDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @IsNotEmpty({ message: 'El status es requerido' })
  @IsEnum(AecoStatusEnum, {
    message: 'El status no es válido',
  })
  readonly status: AecoStatusEnum

  @IsNotEmpty({ message: 'El número de serie es requerido' })
  @IsString({ message: 'El número de serie debe ser una cadena de texto' })
  readonly serialNumber: string

  @IsOptional()
  @Type(() => CreateLocationDto)
  readonly currentCoords?: CreateLocationDto

  @IsOptional()
  @IsNumber({}, { message: 'El id de la compañía debe ser un número' })
  readonly companyId?: number
}
