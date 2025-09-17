import { IsOptional, IsString, Matches } from 'class-validator'

export class GenerateReportDto {
  @IsOptional()
  @IsString({ message: 'Fecha de inicio debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Fecha de inicio debe tener el formato yyyy-MM-DD',
  })
  readonly startDate?: string

  @IsOptional()
  @IsString({ message: 'Fecha de fin debe ser una cadena de texto' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Fecha de fin debe tener el formato yyyy-MM-DD',
  })
  readonly endDate?: string
}
