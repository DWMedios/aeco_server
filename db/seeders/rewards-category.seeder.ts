import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RewardCategory } from '../../src/common/infra/entities/RewardCategory.entity';

export default class RewardCategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(RewardCategory);
    await repository.insert([
      {
        name: 'Predial',
      },
      {
        name: 'Descuento',
      },
      {
        name: 'Puntos',
      },
      {
        name: 'Donativo',
      },
      {
        name: 'Tarjeta',
      },
    ]);
  }
}
