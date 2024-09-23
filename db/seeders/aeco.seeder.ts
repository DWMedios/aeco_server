import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Address } from '../../src/common/infra/entities/Address.entity';
import { Aeco, AecoStatus } from '../../src/common/infra/entities/Aeco.entity';
import { Company } from '../../src/common/infra/entities/Company.entity';

export default class AecoSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const aecoRepository = dataSource.getRepository(Aeco);
    const companyRepository = dataSource.getRepository(Company);
    const addressRepository = dataSource.getRepository(Address);

    const company = await companyRepository.findOne({ where: {} });
    if (!company) {
      throw new Error('No company found. Please run the CompanySeeder first.');
    }

    const address = addressRepository.create({
      postalCode: 12345,
      street: '123 Main St',
      state: 'Sample State',
      coords: { latitude: 40.7128, longitude: -74.006 },
      geometry: [{ type: 'Point', coordinates: [-74.006, 40.7128] }],
    });
    await addressRepository.save(address);

    const aeco = aecoRepository.create({
      name: 'AECO Main',
      status: AecoStatus.ENABLED,
      isOnline: true,
      currentCoords: { latitude: 40.7128, longitude: -74.006 },
      companyId: company.id,
      addressId: address.id,
    });

    await aecoRepository.save(aeco);
  }
}
