import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty({
    description: 'Latitud de la ubicación del dispositivo AECO',
    example: '19.4326077',
    required: true,
  })
  @IsNotEmpty({ message: 'latitude es requerido' })
  @IsString({ message: 'latitude debe ser una cadena de texto' })
  @IsLatitude({ message: 'latitude no es válido' })
  readonly latitude: string

  @ApiProperty({
    description: 'Longitud de la ubicación del dispositivo AECO',
    example: '-99.1353963',
    required: true,
  })
  @IsNotEmpty({ message: 'longitude es requerido' })
  @IsString({ message: 'longitude debe ser una cadena de texto' })
  @IsLongitude({ message: 'longitude no es válido' })
  readonly longitude: string
}

export class CreateAecoDto {
  @ApiProperty({
    description: 'Nombre del dispositivo AECO',
    example: 'AECO Santa Fe',
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @ApiProperty({
    description: 'Estado del dispositivo AECO',
    enum: AecoStatusEnum,
    example: AecoStatusEnum.ENABLED,
    required: true,
  })
  @IsNotEmpty({ message: 'El status es requerido' })
  @IsEnum(AecoStatusEnum, {
    message: 'El status no es válido',
  })
  readonly status: AecoStatusEnum

  @ApiProperty({
    description: 'Número de serie único del dispositivo AECO',
    example: 'AEC-2023-0001',
    required: true,
  })
  @IsNotEmpty({ message: 'El número de serie es requerido' })
  @IsString({ message: 'El número de serie debe ser una cadena de texto' })
  readonly serialNumber: string

  @ApiProperty({
    description: 'Coordenadas actuales del dispositivo AECO',
    type: CreateLocationDto,
    required: false,
  })
  @IsOptional()
  @Type(() => CreateLocationDto)
  readonly currentCoords?: CreateLocationDto

  @ApiProperty({
    description: 'ID de la empresa propietaria del dispositivo AECO',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El id de la compañía debe ser un número' })
  readonly companyId?: number
}
