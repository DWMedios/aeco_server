import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  INSERT_TICKETS_AECO_SERVICE,
  type IInsertTicketsAecoService,
} from '@aecos/domain/services/iot-services/IInsertTicketsAecoService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import { DecodedAeco } from '@shared/domain/Types'
import { CurrentAeco } from '@shared/app/decorators/current-logged.decorator'
import { RequestCreateTicketsDto } from '@aecos/domain/dto/CreateAecoTickets.dto'

@ApiTags('AECOS - IoT')
@Controller('aecos')
export class PostInsertTicketsController {
  logger = new Logger(PostInsertTicketsController.name)

  constructor(
    @Inject(INSERT_TICKETS_AECO_SERVICE)
    private readonly service: IInsertTicketsAecoService,
  ) {}

  @Post('upload-tickets')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Subir tickets generados por un dispositivo AECO' })
  @ApiBody({ type: RequestCreateTicketsDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tickets guardados exitosamente',
    example: { success: true },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error al guardar los tickets',
  })
  async insertTickets(
    @CurrentAeco() aeco: DecodedAeco,
    @Body() payload: RequestCreateTicketsDto,
  ) {
    return await this.service.run(aeco, payload)
  }
}
