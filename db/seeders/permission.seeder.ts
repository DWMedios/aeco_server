import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Company } from '../../src/common/infra/entities/Company.entity';
import {
  UserCompanyPermissions,
  UserRole,
} from '../../src/common/infra/entities/Permission.entity';
import { User } from '../../src/common/infra/entities/User.entity';

export default class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const permissionRepository = dataSource.getRepository(
      UserCompanyPermissions,
    );
    const userRepository = dataSource.getRepository(User);
    const companyRepository = dataSource.getRepository(Company);

    const users = await userRepository.find();
    const companies = await companyRepository.find();

    for (const user of users) {
      for (const company of companies) {
        const userCompanyPermission = permissionRepository.create({
          permissions: [
            { create_user: true },
            { edit_user: true },
            { delete_user: false },
            { view_reports: true },
          ],
          role: user.email.includes('admin') ? UserRole.ADMIN : UserRole.USER,
          userId: user.id,
          companyId: company.id,
        });
        await permissionRepository.save(userCompanyPermission);
      }
    }
  }
}
