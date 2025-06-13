import { DataSource, DataSourceOptions } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { configOptions } from './typeorm.config'

export const configSeedersOptions: PostgresConnectionOptions & DataSourceOptions = {
  ...configOptions,
  migrations: [
    __dirname + '/seeders/*{.ts,.js}',
  ],
}

export default new DataSource(configSeedersOptions)
