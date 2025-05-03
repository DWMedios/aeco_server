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
  UseGuards,
} from '@nestjs/common'
import {
  FIND_COMPANY_SERVICE,
  type IFindCompanyService,
} from '@company/domain/services/IFindCompanyService'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@ApiTags('Empresas')
@Controller('companies')
export class GetCompanyController {
  logger = new Logger(GetCompanyController.name)

  constructor(
    @Inject(FIND_COMPANY_SERVICE)
    private readonly service: IFindCompanyService,
  ) {}

  @Get(':id')
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una empresa por ID' })
  @ApiParam({ name: 'id', description: 'ID de la empresa', example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Empresa encontrada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async getOneCompany(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
