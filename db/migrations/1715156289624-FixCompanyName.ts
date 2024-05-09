import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCompanyName1715156289624 implements MigrationInterface {
  name = 'FixCompanyName1715156289624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131"`,
    );
  }
}
