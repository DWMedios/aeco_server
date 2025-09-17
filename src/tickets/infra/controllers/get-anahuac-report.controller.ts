import { Response } from 'express'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
  Res,
} from '@nestjs/common'
import {
  ANAHUAC_GENERATE_REPORT_SERVICE,
  type IAnahuacGenerateReportService,
} from '@tickets/domain/services/IAnahuacGenerateReportService'
import { GenerateReportDto } from '@tickets/domain/dto/generate-report.dto'

@ApiTags('Tickets')
@Controller('tickets')
export class GetAnahuacReportController {
  logger = new Logger(GetAnahuacReportController.name)

  constructor(
    @Inject(ANAHUAC_GENERATE_REPORT_SERVICE)
    private readonly service: IAnahuacGenerateReportService,
  ) {}

  @Get('anahuac-report')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener el reporte de tickets para Anahuac' })
  @ApiQuery({
    name: 'startDate',
    description: 'Fecha de inicio en formato YYYY-MM-DD',
    required: false,
    example: '2023-01-01',
  })
  @ApiQuery({
    name: 'endDate',
    description: 'Fecha de fin en formato YYYY-MM-DD',
    required: false,
    example: '2023-12-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte generado exitosamente',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description:
      'No se encontraron tickets para el rango de fechas proporcionado',
  })
  async getAnahuacReport(
    @Query() filters: GenerateReportDto,
    @Res() res: Response,
  ) {
    const buferReport = await this.service.run(filters)

    // unix timestamp
    const timestamp = Math.floor(Date.now() / 1000)
    res
      .set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="Reporte_Anahuac_${timestamp}.xlsx"`,
      })
      .send(buferReport)
  }
}
