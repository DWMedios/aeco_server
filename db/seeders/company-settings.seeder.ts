import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Company } from '../../src/common/infra/entities/Company.entity';
import { Setting } from '../../src/common/infra/entities/CompanySettings.entity';

export default class CompanySettingsSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const settingRepository = dataSource.getRepository(Setting);
    const companyRepository = dataSource.getRepository(Company);
    const companies = await companyRepository.find();

    for (const company of companies) {
      const setting = settingRepository.create({
        logoUrl: `https://example.com/logos/${company.name.toLowerCase().replace(' ', '_')}.png`,
        metadata: [{ defaultCurrency: 'USD' }],
        companyId: company.id,
      });
      await settingRepository.save(setting);
    }
  }
}
