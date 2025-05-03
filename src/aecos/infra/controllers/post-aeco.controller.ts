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
  CREATE_AECO_SERVICE,
  type ICreateAecoService,
} from '@aecos/domain/services/ICreateAecoService'
import { CreateAecoDto } from '@aecos/domain/dto/CreateAeco.dto'

@ApiTags('AECOS')
@Controller('aecos')
export class PostAecoController {
  logger = new Logger(PostAecoController.name)

  constructor(
    @Inject(CREATE_AECO_SERVICE)
    private readonly service: ICreateAecoService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo dispositivo AECO' })
  @ApiBody({ type: CreateAecoDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Dispositivo AECO creado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async createAeco(@Body() payload: CreateAecoDto) {
    return await this.service.run(payload)
  }
}
