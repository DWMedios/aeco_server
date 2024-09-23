import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../../src/common/infra/entities/User.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin_password',
        position: 'Administrator',
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'user_password',
        position: 'Employee',
      },
    ]);
  }
}
