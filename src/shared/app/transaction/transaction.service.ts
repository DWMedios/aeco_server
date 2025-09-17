import { DataSource, EntityManager, QueryRunner } from 'typeorm'
import {
  Logger,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import type { TransactionServiceInterface } from '@shared/domain/services/transaction-service.interface'

@Injectable()
export class TransactionService implements TransactionServiceInterface {
  logger = new Logger(TransactionService.name)

  constructor(private readonly dataSource: DataSource) {}

  async executeTransaction<T>(
    work: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const result = await work(queryRunner.manager)
      await queryRunner.commitTransaction()
      return result
    } catch (error) {
      await queryRunner.rollbackTransaction()
      this.logger.error(error)
      throw new InternalServerErrorException(error.message)
    } finally {
      await queryRunner.release()
    }
  }
}
