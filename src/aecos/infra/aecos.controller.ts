import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { AECO_SERVICE, type IAecoService } from '../domain/IAecoService'
import { UpdateAecoDto } from '../domain/dto/UpdateAecoDto'
import { CreateAecoDto } from '../domain/dto/AecoDto'
import { FinishSetupDto } from '../domain/dto/FinishSetupDto'

@Controller('aecos')
export class AecosController {
  constructor(
    @Inject(AECO_SERVICE)
    private readonly aecoService: IAecoService,
  ) {}

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    return await this.aecoService.find(id)
  }

  @Post()
  async create(@Body() createAeco: CreateAecoDto) {
    return await this.aecoService.create(createAeco)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() aeco: UpdateAecoDto,
  ) {
    return await this.aecoService.update(aeco, id)
  }

  @Get('initial-setup/:serialNumber')
  async getInitialSetup(@Param('serialNumber') serialNumber: string) {
    return await this.aecoService.getInitialSetup(serialNumber)
  }

  @Get('needs-update/:serialNumber')
  async getUpdates(@Param('serialNumber') serialNumber: string) {
    return await this.aecoService.getUpdates(serialNumber)
  }

  @Patch('finish-setup/:type/:serialNumber')
  async finishSetup(@Param() params: FinishSetupDto) {
    return await this.aecoService.finishSetup(params)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.aecoService.delete(id)
  }
}
