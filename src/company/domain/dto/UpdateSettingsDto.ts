import { IsOptional, IsString } from 'class-validator'

export class UpdateSettingsDto {
  @IsString()
  @IsOptional()
  key?: string

  @IsString()
  @IsOptional()
  metadata?: Record<string, any>[]
}
