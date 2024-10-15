import { IsOptional, IsString } from 'class-validator'

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  rfc?: string
}
