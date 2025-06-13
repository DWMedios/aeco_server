import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
} from '@nestjs/common'
import {
  FIND_ALL_TICKET_SERVICE,
  type IFindAllTicketService,
} from '@tickets/domain/services/IFindAllTicketService'
import { TicketsFiltersDto } from '@tickets/domain/dto/Filters.dto'
import { TicketsPageResponseDto } from '@tickets/domain/dto/Response.dto'

@ApiTags('Tickets')
@Controller('tickets')
export class GetAllTicketController {
  logger = new Logger(GetAllTicketController.name)

  constructor(
    @Inject(FIND_ALL_TICKET_SERVICE)
    private readonly service: IFindAllTicketService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener lista de tickets con filtros opcionales' })
  @ApiQuery({
    name: 'page',
    description: 'Número de página',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'perpage',
    description: 'Elementos por página',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'orderByDirection',
    description: 'Dirección de ordenamiento',
    required: false,
    enum: ['ASC', 'DESC'],
    example: 'DESC',
  })
  @ApiQuery({
    name: 'orderByField',
    description: 'Campo para ordenar',
    required: false,
    enum: [
      'folio',
      'totalCans',
      'totalBottles',
      'aecoId',
      'productId',
      'id',
      'createdAt',
    ],
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'folio',
    description: 'Filtrar por folio',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'aecoId',
    description: 'Filtrar por ID del AECO',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'productId',
    description: 'Filtrar por ID del producto',
    required: false,
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tickets obtenida exitosamente',
    type: TicketsPageResponseDto,
  })
  async getAllTickets(@Query() filters: TicketsFiltersDto) {
    return await this.service.run(filters)
  }
}
