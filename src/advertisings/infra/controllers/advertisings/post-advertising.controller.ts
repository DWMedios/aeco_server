import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common'
import {
  CREATE_ADVERTISING_SERVICE,
  type ICreateAdvertisingService,
} from '@advertisings/domain/services/advertisings/ICreateAdvertisingService'
import { CreateAdvertisingDto } from '@advertisings/domain/dto/advertisings/CreateAdvertising.dto'

@ApiTags('Publicidad')
@Controller('advertisings')
export class PostAdvertisingController {
  constructor(
    @Inject(CREATE_ADVERTISING_SERVICE)
    private readonly service: ICreateAdvertisingService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo anuncio publicitario' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'El anuncio ha sido creado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async createAdvertising(@Body() payload: CreateAdvertisingDto) {
    return await this.service.run(payload)
  }
}
