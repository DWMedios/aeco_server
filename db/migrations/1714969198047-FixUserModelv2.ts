import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserModelv21714969198047 implements MigrationInterface {
  name = 'FixUserModelv21714969198047';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "position" character varying(50)`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "gender" character varying(20)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "gender" character varying(10) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "position" character varying(100) NOT NULL`,
    );
  }
}
