import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';
import AecoSeeder from './aeco.seeder';
import CompanySettingsSeeder from './company-settings.seeder';
import CompanySeeder from './company.seeder';
import PageSeeder from './page.seeder';
import PromotionSeeder from './promotion.seeder';
import UserSeeder from './user.seeder';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, CompanySeeder);
    await runSeeder(dataSource, CompanySettingsSeeder);
    await runSeeder(dataSource, AecoSeeder);
    await runSeeder(dataSource, PromotionSeeder);
    await runSeeder(dataSource, PageSeeder);
  }
}
