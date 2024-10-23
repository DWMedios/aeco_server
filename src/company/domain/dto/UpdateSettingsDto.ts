import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateSettingsDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly key?: string

  @IsString()
  @IsOptional()
  metadata?: Record<string, any>[]
}
