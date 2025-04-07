import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class GetOneProductQueryFilter {
  @IsOptional()
  @IsBoolean({ message: 'withCapacity must be a boolean' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly withCapacity?: boolean
}

export class GetOneProductCapacityQueryFilter {
  @IsOptional()
  @IsBoolean({ message: 'withCapacity must be a boolean' })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  readonly withProducts?: boolean
}
