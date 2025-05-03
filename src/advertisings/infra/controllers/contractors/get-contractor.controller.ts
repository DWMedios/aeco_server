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
  FIND_CONTRACTOR_SERVICE,
  type IFindContractorService,
} from '@advertisings/domain/services/contractors/IFindContractorService'

@ApiTags('Contratantes')
@Controller('advertisings')
export class GetContractorController {
  logger = new Logger(GetContractorController.name)

  constructor(
    @Inject(FIND_CONTRACTOR_SERVICE)
    private readonly service: IFindContractorService,
  ) {}

  @Get('contractors/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un contratista por su ID' })
  @ApiParam({ name: 'id', description: 'ID del contratista', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contratista encontrado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contratista no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID de contratista inválido',
  })
  async getOneContractor(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
