import { IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateSettingsDto } from './CreateSettingsDto'
import { Type } from 'class-transformer'

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  readonly name?: string

  @IsString()
  @IsOptional()
  readonly rfc?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSettingsDto)
  settings?: CreateSettingsDto
}
