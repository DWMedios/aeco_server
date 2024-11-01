import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

config()

const configService = new ConfigService()

export const configOptions: PostgresConnectionOptions & DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  synchronize: false,
  logging: configService.get('NODE_ENV') === 'development',
  entities: [__dirname + '/../src/common/infra/entities/*.entity{.ts,.js}'],
  migrations: [
    __dirname + '/migrations/*{.ts,.js}',
    // __dirname + '/seeders/*{.ts,.js}',
  ],
  migrationsTableName: 'migrations_typeorm',
}

export default new DataSource(configOptions)
