import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddMetadataColumnToAecos1730488809784
  implements MigrationInterface
{
  name = 'AddMetadataColumnToAecos1730488809784'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aecos" ADD COLUMN "metadata" jsonb NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "aecos" DROP COLUMN "metadata"`)
  }
}
