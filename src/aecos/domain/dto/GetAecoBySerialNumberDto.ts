import { IsNotEmpty, IsString } from 'class-validator'

export class GetAecoBySerialNumberDto {
  @IsString()
  @IsNotEmpty()
  readonly serialNumber: string
}
