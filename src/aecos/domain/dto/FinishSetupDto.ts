import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { FinishSetupType } from '../enums/FinishSetupType.enum'

export class FinishSetupDto {
  @ApiProperty({
    description: 'Tipo de finalización de configuración',
    enum: FinishSetupType,
    example: FinishSetupType.INIT,
    required: true,
  })
  @IsEnum(FinishSetupType, {
    message: 'status must be either init, updated',
  })
  @IsNotEmpty()
  readonly type: FinishSetupType

  @ApiProperty({
    description: 'Número de serie del dispositivo AECO',
    example: 'AEC-2023-0001',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly serialNumber: string
}
