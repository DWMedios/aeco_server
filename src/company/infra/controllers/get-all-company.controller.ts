import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  FIND_ALL_COMPANY_SERVICE,
  type IFindAllCompanyService,
} from '@company/domain/services/IFindAllCompanyService'
import { CompanyFiltersDto } from '@company/domain/dto/Filters.dto'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@ApiTags('Empresas')
@Controller('companies')
export class GetAllCompanyController {
  logger = new Logger(GetAllCompanyController.name)

  constructor(
    @Inject(FIND_ALL_COMPANY_SERVICE)
    private readonly service: IFindAllCompanyService,
  ) {}

  @Get()
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener todas las empresas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de empresas obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async getAllCompanies(@Query() filters: CompanyFiltersDto) {
    return await this.service.run(filters)
  }
}
