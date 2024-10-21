import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateSettingsDto } from './CreateSettingsDto'
import { Type } from 'class-transformer'

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  rfc?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSettingsDto)
  settings?: CreateSettingsDto
}
