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
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  readonly name: string

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotInBlacklist()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email: string

  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  @IsString({
    message: 'El teléfono debe ser una cadena de texto',
  })
  @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El teléfono debe contener solo números',
  })
  readonly phone: string

  @IsNotEmpty({ message: 'El companyId no puede estar vacío' })
  @IsNumber({}, { message: 'El companyId debe ser un número' })
  readonly companyId: number

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMediaAssetDto)
  readonly mediaAsset?: CreateMediaAssetDto
}
