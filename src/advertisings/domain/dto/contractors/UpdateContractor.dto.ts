import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator'
import { IsNotInBlacklist } from '@shared/validators/email-blacklist.validator'
import { UpdateMediaAssetDto } from '@shared/domain/dto/Common.dto'

export class UpdateContractorDto {
  @ApiPropertyOptional({
    description: 'Nombre del contratista',
    example: 'Juan Pérez Actualizado',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name?: string

  @ApiPropertyOptional({
    description: 'Correo electrónico del contratista',
    example: 'juan.perez.actualizado@empresa.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email?: string

  @ApiPropertyOptional({
    description: 'Número telefónico del contratista (10 dígitos)',
    example: '9876543210',
    minLength: 10,
    maxLength: 10,
  })
  @IsOptional()
  @IsString({
    message: 'El teléfono debe ser una cadena de texto',
  })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone?: string

  @ApiPropertyOptional({
    description: 'Recurso multimedia asociado al contratista',
    type: UpdateMediaAssetDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateMediaAssetDto)
  readonly mediaAsset?: UpdateMediaAssetDto
}
