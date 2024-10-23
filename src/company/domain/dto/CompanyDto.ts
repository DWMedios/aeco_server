import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateSettingsDto } from './CreateSettingsDto'

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
