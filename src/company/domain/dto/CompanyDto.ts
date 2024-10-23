import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { CreateSettingsDto } from './CreateSettingsDto'

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly rfc: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSettingsDto)
  readonly settings?: CreateSettingsDto
}
