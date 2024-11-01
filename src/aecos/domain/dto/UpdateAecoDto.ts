import { IsOptional, IsString } from 'class-validator'

export class UpdateAecoDto {
  @IsString()
  @IsOptional()
  readonly name?: string

  @IsString()
  @IsOptional()
  readonly rfc?: string
}
