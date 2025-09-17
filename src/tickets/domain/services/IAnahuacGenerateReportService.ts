import type { GenerateReportDto } from '../dto/generate-report.dto'

export const ANAHUAC_GENERATE_REPORT_SERVICE = Symbol(
  'IAnahuacGenerateReportService',
)

export interface IAnahuacGenerateReportService {
  run(payload: GenerateReportDto): Promise<Buffer>
}
