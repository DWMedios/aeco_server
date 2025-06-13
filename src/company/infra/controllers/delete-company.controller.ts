import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import {
  DELETE_COMPANY_SERVICE,
  type IDeleteCompanyService,
} from '@company/domain/services/IDeleteCompanyService'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@ApiTags('Empresas')
@Controller('companies')
export class DeleteCompanyController {
  logger = new Logger(DeleteCompanyController.name)

  constructor(
    @Inject(DELETE_COMPANY_SERVICE)
    private readonly service: IDeleteCompanyService,
  ) {}

  @Delete(':id')
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una empresa existente' })
  @ApiParam({
    name: 'id',
    description: 'ID de la empresa a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Empresa eliminada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async deleteCompany(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
