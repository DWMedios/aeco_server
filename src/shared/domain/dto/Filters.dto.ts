import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsIn, IsOptional } from 'class-validator'
import type { OrderByDirectionType } from '../enums/Filters.enum'
import { PageOptionsDto } from '../pagination/dto/page-options.dto'

export class BaseFiltersDto extends PageOptionsDto {
  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento (ascendente o descendente)',
    enum: ['ASC', 'DESC'],
    example: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'], {
    message: 'orderByDirection debe ser ASC o DESC',
  })
  @Transform(({ value }) => (value ? value.toUpperCase() : value))
  readonly orderByDirection?: OrderByDirectionType
}
