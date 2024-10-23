import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameLogoUrlToKey1729634992909 implements MigrationInterface {
  name = 'RenameLogoUrlToKey1729634992909'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company_settings" RENAME COLUMN "logoUrl" TO "key"`,
    )
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "key" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company_settings" RENAME COLUMN "key" TO "logoUrl"`,
    )
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "logoUrl" SET NOT NULL`,
    )
  }
}
