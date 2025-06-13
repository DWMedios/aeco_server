import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Inject, Post, HttpStatus } from '@nestjs/common'
import { PAGE_SERVICE, type IPageService } from '../domain/IPageService'
import { CreatePageDto } from '../domain/dto/Page.dto'

@ApiTags('Páginas')
@Controller('pages')
export class PagesController {
  constructor(
    @Inject(PAGE_SERVICE)
    private readonly pageService: IPageService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva página',
    description: 'Crea una nueva página en el sistema',
  })
  @ApiBody({ type: CreatePageDto, description: 'Datos de la página a crear' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Página creada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async create(@Body() payload: CreatePageDto) {
    return await this.pageService.create(payload)
  }
}
