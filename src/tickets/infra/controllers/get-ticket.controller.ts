import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import {
  FIND_TICKET_SERVICE,
  type IFindTicketService,
} from '@tickets/domain/services/IFindTicketService'
import { TicketResponseDto } from '@tickets/domain/dto/Response.dto'

@ApiTags('Tickets')
@Controller('tickets')
export class GetTicketController {
  logger = new Logger(GetTicketController.name)

  constructor(
    @Inject(FIND_TICKET_SERVICE)
    private readonly service: IFindTicketService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un ticket por su ID' })
  @ApiParam({
    name: 'id',
    description: 'ID único del ticket',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ticket encontrado exitosamente',
    type: TicketResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Ticket no encontrado',
  })
  async getOneTicket(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
