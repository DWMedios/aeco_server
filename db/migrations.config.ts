import { DataSource, DataSourceOptions } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { configOptions } from './typeorm.config'

export const configMigrationsOptions: PostgresConnectionOptions & DataSourceOptions = {
  ...configOptions,
  migrations: [
    __dirname + '/migrations/*{.ts,.js}',
  ],
}

export default new DataSource(configMigrationsOptions)
