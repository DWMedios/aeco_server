import { ApiProperty } from '@nestjs/swagger'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export class ProductResponseDto {
  @ApiProperty({ description: 'ID del producto', type: Number, example: 1 })
  id: number

  @ApiProperty({
    description: 'Nombre del producto',
    type: String,
    example: 'Coca Cola',
  })
  name: string

  @ApiProperty({
    description: 'Código del producto',
    type: String,
    example: 'CCOLA001',
  })
  code: string

  @ApiProperty({
    description: 'Familia del producto',
    type: String,
    example: 'Refrescos',
  })
  family: string
}

export class TicketItemResponseDto {
  @ApiProperty({
    description: 'ID único del item del ticket',
    type: Number,
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Cantidad de productos reciclados',
    type: Number,
    example: 5,
  })
  quantity: number

  @ApiProperty({
    description: 'Tipo de empaque reciclado',
    enum: ['bottle', 'can'],
    example: 'bottle',
  })
  packagingType: string

  @ApiProperty({
    description: 'Producto asociado al item',
    type: ProductResponseDto,
  })
  product: ProductResponseDto
}

export class AecoResponseDto {
  @ApiProperty({ description: 'ID único del AECO', type: Number, example: 1 })
  id: number

  @ApiProperty({
    description: 'Folio del AECO',
    type: String,
    example: 'AECO-001',
  })
  folio: string

  @ApiProperty({
    description: 'Nombre del AECO',
    type: String,
    example: 'AECO Principal',
  })
  name: string
}

export class TicketResponseDto {
  @ApiProperty({ description: 'ID único del ticket', type: Number, example: 1 })
  id: number

  @ApiProperty({
    description: 'Folio único del ticket',
    type: String,
    example: 'AECO-TICKET-001',
  })
  folio: string

  @ApiProperty({
    description: 'Método de reciclaje utilizado',
    type: String,
    example: 'manual',
  })
  method: string

  @ApiProperty({
    description: 'Resumen adicional del ticket',
  })
  summary: Record<string, any>

  @ApiProperty({
    description: 'Total de latas recicladas',
    type: Number,
    example: 3,
  })
  totalCans: number

  @ApiProperty({
    description: 'Total de botellas recicladas',
    type: Number,
    example: 2,
  })
  totalBottles: number

  @ApiProperty({
    description: 'Fecha de creación del ticket',
    type: String,
    format: 'date-time',
  })
  createdAt: Date

  @ApiProperty({
    description: 'AECO relacionado con el ticket',
    type: AecoResponseDto,
  })
  aeco: AecoResponseDto

  @ApiProperty({
    description: 'Items incluidos en el ticket',
    type: [TicketItemResponseDto],
  })
  items: TicketItemResponseDto[]
}

export class TicketsPageResponseDto {
  @ApiProperty({
    description: 'Lista de tickets',
    type: [TicketResponseDto],
  })
  data: TicketResponseDto[]

  @ApiProperty({
    description: 'Metadata de paginación',
    type: PageMetaDto,
  })
  meta: PageMetaDto<TicketResponseDto>
}
