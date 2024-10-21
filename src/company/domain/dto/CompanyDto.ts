import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateSettingsDto } from './CreateSettingsDto'
import { Type } from 'class-transformer'

export class CreateCompanyDto {
  @IsString()
  name: string

  @IsString()
  rfc: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSettingsDto)
  settings?: CreateSettingsDto
}
