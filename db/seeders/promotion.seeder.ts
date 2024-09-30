import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'
import { Company } from '../../src/common/infra/entities/Company.entity'
import { Promotion } from '../../src/common/infra/entities/Promotion.entity'

export default class PromotionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const promotionRepository = dataSource.getRepository(Promotion)
    const companyRepository = dataSource.getRepository(Company)

    const company = await companyRepository.findOne({ where: {} })
    if (!company) {
      throw new Error('No company found. Please run the CompanySeeder first.')
    }

    const promotions = [
      {
        order: 1,
        name: 'Summer Sale',
        description: '20% off on all summer items',
        changeQty: 20,
        logoUrl: 'https://example.com/summer-sale-logo.png',
        isEnabled: true,
        companyId: company.id,
      },
      {
        order: 2,
        name: 'New User Discount',
        description: '10% off on first purchase',
        changeQty: 10,
        logoUrl: 'https://example.com/new-user-discount-logo.png',
        isEnabled: true,
        companyId: company.id,
      },
    ]

    for (const promotionData of promotions) {
      const promotion = promotionRepository.create(promotionData)
      await promotionRepository.save(promotion)
    }
  }
}
