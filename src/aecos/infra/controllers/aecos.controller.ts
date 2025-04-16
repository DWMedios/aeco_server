import { Controller, Get, Inject, Logger, Param, Patch } from '@nestjs/common'
import {
  AECO_SERVICE,
  type IAecoService,
} from '@aecos/domain/services/IAecoService'
import { FinishSetupDto } from '@aecos/domain/dto/FinishSetupDto'

@Controller('aecos')
export class AecosController {
  logger = new Logger(AecosController.name)

  constructor(
    @Inject(AECO_SERVICE)
    private readonly aecoService: IAecoService,
  ) {}

  @Get('initial-setup/:serialNumber')
  async getInitialSetup(@Param('serialNumber') serialNumber: string) {
    return await this.aecoService.getInitialSetup(serialNumber)
  }

  @Patch('finish-setup/:type/:serialNumber')
  async finishSetup(@Param() params: FinishSetupDto) {
    return await this.aecoService.finishSetup(params)
  }
}
