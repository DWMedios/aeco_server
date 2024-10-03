import { IsEmail, IsNumber, IsString } from 'class-validator'

export class CreateUserDto {
  @IsNumber()
  companyId: number

  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}
