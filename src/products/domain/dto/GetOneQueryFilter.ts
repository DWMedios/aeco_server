import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class GetOneProductQueryFilter {
  @ApiPropertyOptional({
    description: 'Incluir información de capacidad del producto',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'withCapacity must be a boolean' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly withCapacity?: boolean
}

export class GetOneProductCapacityQueryFilter {
  @ApiPropertyOptional({
    description: 'Incluir información de productos asociados a esta capacidad',
    example: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'withCapacity must be a boolean' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly withProducts?: boolean
}
