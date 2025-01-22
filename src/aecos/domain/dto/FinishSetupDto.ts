import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { FinishSetupType } from '../enums/FinishSetupType.enum'

export class FinishSetupDto {
  @IsEnum(FinishSetupType, {
    message: 'status must be either init, updated',
  })
  @IsNotEmpty()
  readonly type: FinishSetupType

  @IsNotEmpty()
  @IsString()
  readonly serialNumber: string
}
