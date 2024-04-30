import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixModels1714466665641 implements MigrationInterface {
  name = 'FixModels1714466665641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aecos" DROP CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" DROP CONSTRAINT "FK_c1e6e3d7f21a7f4de7904fe62cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "companyId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "addressId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ADD CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ADD CONSTRAINT "FK_c1e6e3d7f21a7f4de7904fe62cb" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aecos" DROP CONSTRAINT "FK_c1e6e3d7f21a7f4de7904fe62cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" DROP CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "addressId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "companyId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ADD CONSTRAINT "FK_c1e6e3d7f21a7f4de7904fe62cb" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ADD CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
