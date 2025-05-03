import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator'
import { IsNotInBlacklist } from '@shared/validators/email-blacklist.validator'
import { CreateMediaAssetDto } from '@shared/domain/dto/Common.dto'

export class CreateContractorDto {
  @ApiProperty({
    description: 'Nombre del contratista',
    example: 'Juan Pérez',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @ApiProperty({
    description: 'Correo electrónico del contratista',
    example: 'juan.perez@empresa.com',
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @ApiProperty({
    description: 'Número telefónico del contratista (10 dígitos)',
    example: '1234567890',
    minLength: 10,
    maxLength: 10,
  })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  @IsString({
    message: 'El teléfono debe ser una cadena de texto',
  })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone: string

  @ApiProperty({
    description: 'ID de la compañía a la que está asociado el contratista',
    example: 1,
    type: Number,
  })
  @IsNotEmpty({ message: 'El companyId no puede estar vacío' })
  @IsNumber({}, { message: 'El companyId debe ser un número' })
  readonly companyId: number

  @ApiPropertyOptional({
    description: 'Recurso multimedia asociado al contratista',
    type: CreateMediaAssetDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaAssetDto)
  readonly mediaAsset?: CreateMediaAssetDto
}
