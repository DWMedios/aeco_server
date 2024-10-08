import { IsNotEmpty, IsString } from 'class-validator'

export class GetAecoBySerialNumberDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string
}
