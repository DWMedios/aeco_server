import { IsOptional, IsString } from 'class-validator'

export class CreateSettingsDto {
  @IsString()
  key?: string

  @IsOptional()
  metadata?: Record<string, any>
}
