import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Verificar el estado del servidor' })
  @ApiResponse({
    status: 200,
    description: 'El servidor está funcionando correctamente',
    type: String,
  })
  healthCheck(): string {
    return this.appService.healthCheck()
  }
}
