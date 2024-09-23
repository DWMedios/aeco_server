import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Company } from '../../src/common/infra/entities/Company.entity';

export default class CompanySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Company);
    await repository.insert([
      {
        name: 'AECO Company',
        rfc: 'ACO123456ABC',
      },
    ]);
  }
}
