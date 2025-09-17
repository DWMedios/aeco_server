import { Workbook } from 'exceljs'
import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import {
  TICKET_REPOSITORY,
  type ITicketRepository,
} from '@shared/domain/repositories'
import type { GenerateReportDto } from '@tickets/domain/dto/generate-report.dto'
import {
  formatDate,
  formatDateOnly,
  formatHoursAndMinutes,
} from '@shared/utils/functions'
import { PackingType } from '@common/domain/Types'
import type { IAnahuacGenerateReportService } from '@tickets/domain/services/IAnahuacGenerateReportService'

@Injectable()
export class AnahuacGenerateReportService
  implements IAnahuacGenerateReportService
{
  private readonly logger = new Logger(AnahuacGenerateReportService.name)

  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async run(payload: GenerateReportDto): Promise<Buffer> {
    const tickets = await this.ticketRepository.findManyCardCodes(
      payload?.startDate,
      payload?.endDate,
    )

    if (!tickets || tickets.length === 0) {
      this.logger.warn('No tickets found for the given date range')
      throw new NotFoundException(
        'No se encontraron tickets para el rango de fechas proporcionado',
      )
    }
    try {
      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet('Tickets')

      // Add column headers
      worksheet.columns = [
        { header: 'N°', key: 'id', width: 10 },
        { header: 'Fecha', key: 'createdAt', width: 30 },
        { header: 'ID Alumno', key: 'cardCode', width: 20 },
        { header: 'Ticket info', key: 'ticketInfo', width: 40 },
        { header: 'Nombre del Alumno', key: 'studentName', width: 40 },
        { header: 'Carrera', key: 'career', width: 40 },
        { header: 'Semestre', key: 'semester', width: 40 },
      ]

      // Add ticket data
      tickets.forEach((ticket) => {
        const aecoName = ticket.aeco?.name ?? 'N/A'
        const items = ticket.items || []
        const summary = ticket.summary ?? {}

        const totalItems =
          (ticket?.totalCans ?? 0) + (ticket?.totalBottles ?? 0)
        const createdAt = new Date(ticket.createdAt)
        const ticketInfo = [
          `Nombre Aeco: ${aecoName}`,
          `Folio Ticket: ${ticket.folio}`,
          `Fecha: ${formatDateOnly(createdAt)}`,
          `Hora: ${formatHoursAndMinutes(createdAt)}`,
          `Total Items: ${totalItems}`,
          `Resumen: \n${
            items.length > 0
              ? items
                  .map(
                    (item) =>
                      `${item?.quantity ?? '-'} ${item.product?.name ?? '-'} ${this.getPackingName(item.packagingType) ?? '-'}`,
                  )
                  .join('\n')
              : 'N/A'
          }`,
        ].join('\n')

        worksheet.addRow({
          id: ticket.id,
          createdAt: formatDate(createdAt),
          cardCode: summary.cardCode ?? 'N/A',
          ticketInfo,
          studentName: '',
          career: '',
          semester: '',
        })
      })

      // Aplica wrapText solo a la columna ticketInfo
      worksheet
        .getColumn('ticketInfo')
        .eachCell({ includeEmpty: false }, (cell) => {
          cell.alignment = { wrapText: true, vertical: 'top' }
        })

      // Centra el texto de las demás celdas (todas las columnas excepto 'ticketInfo')
      worksheet.eachRow((row, rowNumber) => {
        // Salta la fila de encabezados si es necesario (usualmente la fila 1)
        if (rowNumber === 1) return
        row.eachCell((cell, colNumber) => {
          if (worksheet.getColumn(colNumber).key !== 'ticketInfo') {
            cell.alignment = { vertical: 'middle', horizontal: 'center' }
          }
        })
      })

      // Generate Excel file
      const arrayBuffer = await workbook.xlsx.writeBuffer()
      return Buffer.from(arrayBuffer)
    } catch (error) {
      this.logger.error('Error generating report', error.stack)
      throw new InternalServerErrorException('Error al generar el reporte')
    }
  }

  private getPackingName(packagingType: PackingType): string {
    switch (packagingType) {
      case 'bottle':
        return 'Botella'
      case 'can':
        return 'Lata'
      default:
        return 'Desconocido'
    }
  }
}
