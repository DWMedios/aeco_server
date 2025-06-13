import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class FilterIotAfterLastDto {
  @ApiProperty({
    description: 'ID del último mensaje IoT recibido',
    example: 12345,
    type: Number,
  })
  @IsNotEmpty({ message: 'lastId no puede estar vacío' })
  @IsNumber({}, { message: 'lastId debe ser un número' })
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly lastId: number
}
