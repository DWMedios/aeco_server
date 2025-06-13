import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common'
import {
  UPDATE_CONTRACTOR_SERVICE,
  type IUpdateContractorService,
} from '@advertisings/domain/services/contractors/IUpdateContractorService'
import { UpdateContractorDto } from '@advertisings/domain/dto/contractors/UpdateContractor.dto'

@ApiTags('Contratantes')
@Controller('advertisings')
export class PutContractorController {
  logger = new Logger(PutContractorController.name)

  constructor(
    @Inject(UPDATE_CONTRACTOR_SERVICE)
    private readonly service: IUpdateContractorService,
  ) {}

  @Put('contractors/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un contratista existente' })
  @ApiParam({ name: 'id', description: 'ID del contratista', type: 'number' })
  @ApiBody({
    type: UpdateContractorDto,
    description: 'Datos para actualizar el contratista',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contratista actualizado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contratista no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Ya existe un contratista con ese email',
  })
  async updateContractor(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateContractorDto,
  ) {
    return await this.service.run(id, payload)
  }
}
