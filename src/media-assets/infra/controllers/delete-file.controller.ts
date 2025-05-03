import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ValidationPipe,
} from '@nestjs/common'
import {
  DELETE_FILE_SERVICE,
  type IDeleteFileService,
} from '@media-assets/domain/services/IDeleteFileService'
import { GetDownloadUrlDto } from '@media-assets/domain/dto/GetDownloadUrl.dto'

@ApiTags('Media Assets')
@Controller('media-assets')
export class DeleteFileController {
  logger = new Logger(DeleteFileController.name)

  constructor(
    @Inject(DELETE_FILE_SERVICE)
    private readonly service: IDeleteFileService,
  ) {}

  @Delete(':key')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Elimina un archivo multimedia del sistema' })
  @ApiParam({
    name: 'key',
    description: 'Clave única que identifica el archivo a eliminar',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Archivo eliminado correctamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'El archivo no fue encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado para eliminar el archivo',
  })
  async deleteFile(
    @Param(new ValidationPipe({ transform: true })) param: GetDownloadUrlDto,
  ) {
    return await this.service.run(param.key)
  }
}
