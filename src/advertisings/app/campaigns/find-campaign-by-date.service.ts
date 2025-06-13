import { DateTime } from 'luxon'
import {
  BadRequestException,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import {
  CAMPAIGN_REPOSITORY,
  COMPANY_REPOSITORY,
  type ICampaignRepository,
} from '@shared/domain/repositories'
import type { FilterCampaignByDateDto } from '@advertisings/domain/dto/Filters.dto'
import type { CountByDay, DateIntervals } from '@advertisings/domain/Types'
import type { IFindCampaignByDateService } from '@advertisings/domain/services/campaigns/IFindCampaignByDateService'

export class FindCampaignByDateService implements IFindCampaignByDateService {
  logger = new Logger(FindCampaignByDateService.name)

  constructor(
    @Inject(CAMPAIGN_REPOSITORY)
    private readonly campaignRepository: ICampaignRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICampaignRepository,
  ) {}

  async run(filters: FilterCampaignByDateDto): Promise<CountByDay[]> {
    if (filters.companyId) {
      const company = await this.companyRepository.findById(filters.companyId)
      if (!company) {
        this.logger.error('La empresa no existe')
        throw new NotFoundException('La empresa no existe')
      }
    }

    const startDate = DateTime.fromISO(filters.startDate.toString())
    const endDate = DateTime.fromISO(filters.endDate.toString())

    if (!startDate.isValid || !endDate.isValid) {
      throw new BadRequestException('Alguna de las fechas no es válida')
    }

    if (startDate > endDate) {
      throw new BadRequestException(
        'La fecha de inicio no puede ser mayor a la fecha de fin',
      )
    }

    const dateRange = this.createDateRange(startDate, endDate)

    const result = await this.campaignRepository.findByDatePeriod(
      filters.companyId,
      startDate.toJSDate(),
      endDate.toJSDate(),
    )

    return this.mapDateIntervals(dateRange, result)
  }

  private createDateRange(
    startDate: DateTime,
    endDate: DateTime,
  ): DateIntervals[] {
    const intervals: DateIntervals[] = []
    let currentStartDate = startDate.startOf('day')
    const adjustedEndDate = endDate.startOf('day')

    while (currentStartDate <= adjustedEndDate) {
      intervals.push({
        startDate: currentStartDate.toISODate(),
        endDate: currentStartDate.toISODate(),
        label: currentStartDate.toFormat('dd MMM yyyy'),
      })

      currentStartDate = currentStartDate.plus({ days: 1 })
    }
    return intervals
  }

  private mapDateIntervals(
    intervals: DateIntervals[],
    result: CountByDay[],
  ): CountByDay[] {
    return intervals.map((interval) => {
      const found = result.find((item) => item.date === interval.label)
      return {
        label: interval.label,
        date: interval.startDate,
        count: found?.count ?? 0,
      }
    })
  }
}
