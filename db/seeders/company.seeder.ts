import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'
import { Company } from '../../src/common/infra/entities/Company.entity'

export default class CompanySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const queryRunner = dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.query('TRUNCATE TABLE companies CASCADE')
    await queryRunner.query('TRUNCATE TABLE aecos CASCADE')
    await queryRunner.query('TRUNCATE TABLE addresses CASCADE')

    const repository = dataSource.getRepository(Company)
    await repository.insert([
      {
        name: 'AECO Company',
        rfc: 'ACO123456ABC',
      },
    ])
  }
}
