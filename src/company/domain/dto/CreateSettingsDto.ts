import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSettingsDto {
  @IsString()
  @IsNotEmpty()
  readonly key?: string

  @IsOptional()
  readonly metadata?: Record<string, any>
}
