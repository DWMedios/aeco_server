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
  UseGuards,
} from '@nestjs/common'
import {
  UPDATE_COMPANY_SERVICE,
  type IUpdateCompanyService,
} from '@company/domain/services/IUpdateCompanyService'
import { UpdateCompanyDto } from '@company/domain/dto/UpdateCompany.dto'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@ApiTags('Empresas')
@Controller('companies')
export class PutCompanyController {
  logger = new Logger(PutCompanyController.name)

  constructor(
    @Inject(UPDATE_COMPANY_SERVICE)
    private readonly service: IUpdateCompanyService,
  ) {}

  @Put(':id')
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar una empresa existente' })
  @ApiParam({
    name: 'id',
    description: 'ID de la empresa a actualizar',
    example: 1,
  })
  @ApiBody({ type: UpdateCompanyDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Empresa actualizada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCompanyDto,
  ) {
    return await this.service.run(id, payload)
  }
}
