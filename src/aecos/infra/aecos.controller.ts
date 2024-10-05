import { Controller, Get, Inject, Query } from '@nestjs/common'
import { AECO_SERVICE, type IAecoService } from '../domain/IAecoService'
import { GetAecoBySerialNumberDto } from '../domain/dto/AecoDto'

@Controller('aecos')
export class AecosController {
  constructor(
    @Inject(AECO_SERVICE)
    private readonly aecoService: IAecoService,
  ) {}

  @Get('initial-setup')
  async getInitialSetup(@Query() query: GetAecoBySerialNumberDto) {
    const { serialNumber } = query
    return await this.aecoService.getInitialSetup(serialNumber)
  }
}
