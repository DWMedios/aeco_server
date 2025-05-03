import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common'
import {
  CREATE_CONTRACTOR_SERVICE,
  type ICreateContractorService,
} from '@advertisings/domain/services/contractors/ICreateContractorService'
import { CreateContractorDto } from '@advertisings/domain/dto/contractors/CreateContractor.dto'

@ApiTags('Contratantes')
@Controller('advertisings')
export class PostContractorController {
  logger = new Logger(PostContractorController.name)

  constructor(
    @Inject(CREATE_CONTRACTOR_SERVICE)
    private readonly service: ICreateContractorService,
  ) {}

  @Post('contractors')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo contratista' })
  @ApiBody({
    type: CreateContractorDto,
    description: 'Datos para crear el contratista',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'El contratista ha sido creado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Ya existe un contratista con ese email',
  })
  async createContractor(@Body() payload: CreateContractorDto) {
    return await this.service.run(payload)
  }
}
