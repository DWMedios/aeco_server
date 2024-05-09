import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserModel1714969086139 implements MigrationInterface {
  name = 'FixUserModel1714969086139';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "position" character varying(50)`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "gender" character varying(20)`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "position" character varying(100) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "gender" character varying(10) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "gender" character varying(20)`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "position" character varying(50)`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "gender" character varying(10) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "position"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "position" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`,
    );
  }
}
