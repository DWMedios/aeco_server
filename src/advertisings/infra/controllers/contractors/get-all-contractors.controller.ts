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
  FIND_ALL_CONTRACTOR_SERVICE,
  type IFindAllContractorService,
} from '@advertisings/domain/services/contractors/IFindAllContractorService'
import { ContractorFiltersDto } from '@advertisings/domain/dto/Filters.dto'

@ApiTags('Contratantes')
@Controller('advertisings')
export class GetAllContractorsController {
  logger = new Logger(GetAllContractorsController.name)

  constructor(
    @Inject(FIND_ALL_CONTRACTOR_SERVICE)
    private readonly service: IFindAllContractorService,
  ) {}

  @Get('contractors')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener listado de contratistas' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filtrar por nombre del contratista',
    type: String,
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Filtrar por email del contratista',
    type: String,
  })
  @ApiQuery({
    name: 'phone',
    required: false,
    description: 'Filtrar por teléfono del contratista',
    type: String,
  })
  @ApiQuery({
    name: 'companyId',
    required: false,
    description: 'Filtrar por ID de la compañía',
    type: Number,
  })
  @ApiQuery({
    name: 'orderByField',
    required: false,
    description: 'Campo por el cual ordenar',
    enum: ['createdAt', 'name', 'email', 'status', 'id'],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Límite de resultados por página',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de contratistas recuperada exitosamente',
  })
  async getAllContractors(@Query() filters: ContractorFiltersDto) {
    return await this.service.run(filters)
  }
}
