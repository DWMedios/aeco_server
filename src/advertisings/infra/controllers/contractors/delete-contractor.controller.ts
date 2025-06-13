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
} from '@nestjs/common'
import {
  DELETE_CONTRACTOR_SERVICE,
  type IDeleteContractorService,
} from '@advertisings/domain/services/contractors/IDeleteContractorService'

@ApiTags('Contratantes')
@Controller('advertisings')
export class DeleteContractorController {
  logger = new Logger(DeleteContractorController.name)

  constructor(
    @Inject(DELETE_CONTRACTOR_SERVICE)
    private readonly service: IDeleteContractorService,
  ) {}

  @Delete('contractors/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un contratista' })
  @ApiParam({
    name: 'id',
    description: 'ID del contratista a eliminar',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contratista eliminado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contratista no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID de contratista inválido',
  })
  async deleteContractor(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
