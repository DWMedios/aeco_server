import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsNumber, IsOptional, Max, Min } from 'class-validator'

export class PageOptionsDto {
  @ApiPropertyOptional({
    description: 'Número de página actual',
    example: 1,
    default: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'page debe ser um número' })
  @Min(1, { message: 'page debe ser mayor o igual a 1' })
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly page?: number = 1

  @ApiPropertyOptional({
    description: 'Cantidad de elementos por página',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @IsNumber({}, { message: 'perpage debe ser un número' })
  @Min(1, { message: 'perpage debe ser mayor o igual a 1' })
  @Max(50, { message: 'perpage debe ser menor o igual a 50' })
  @Type(() => Number)
  @Transform(({ value }) => (value ? Number(value) : value))
  readonly perpage?: number = 10

  constructor(page?: number, perpage?: number) {
    this.page = page ?? 1
    this.perpage = perpage ?? 10
  }
}
