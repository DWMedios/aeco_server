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
  CREATE_COMPANY_SERVICE,
  type ICreateCompanyService,
} from '@company/domain/services/ICreateCompanyService'
import { CreateCompanyDto } from '@company/domain/dto/CreateCompany.dto'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@ApiTags('Empresas')
@Controller('companies')
export class PostCompanyController {
  logger = new Logger(PostCompanyController.name)

  constructor(
    @Inject(CREATE_COMPANY_SERVICE)
    private readonly service: ICreateCompanyService,
  ) {}

  @Post()
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva empresa' })
  @ApiBody({ type: CreateCompanyDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Empresa creada exitosamente',
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
    status: HttpStatus.CONFLICT,
    description: 'La empresa ya está registrada',
  })
  async createCompany(@Body() payload: CreateCompanyDto) {
    return await this.service.run(payload)
  }
}
