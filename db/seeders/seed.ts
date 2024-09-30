import { configOptions } from '../typeorm.config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { runSeeders, SeederOptions } from 'typeorm-extension'
import AecoSeeder from './aeco.seeder'
import CompanySeeder from './company.seeder'

const options: DataSourceOptions & SeederOptions = {
  ...configOptions,
  seedTracking: true,
  seedTableName: 'seeds_typeorm',
  seeds: [CompanySeeder, AecoSeeder],
}

const datasource = new DataSource(options)
datasource.initialize().then(async () => {
  await runSeeders(datasource)
  process.exit()
})
