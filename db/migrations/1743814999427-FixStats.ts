import { MigrationInterface, QueryRunner } from "typeorm";

export class FixStats1743814999427 implements MigrationInterface {
    name = 'FixStats1743814999427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stats" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "daily_stats" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "packaging_stats" ADD "coompanyId" integer`);
        await queryRunner.query(`ALTER TABLE "packaging_stats" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "product_stats" ADD CONSTRAINT "FK_24a03ec19ad43dce77464b78394" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_stats" ADD CONSTRAINT "FK_17547609ffac7effffc66add479" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "packaging_stats" ADD CONSTRAINT "FK_adab4bb96b4803920be74a89bd3" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging_stats" DROP CONSTRAINT "FK_adab4bb96b4803920be74a89bd3"`);
        await queryRunner.query(`ALTER TABLE "daily_stats" DROP CONSTRAINT "FK_17547609ffac7effffc66add479"`);
        await queryRunner.query(`ALTER TABLE "product_stats" DROP CONSTRAINT "FK_24a03ec19ad43dce77464b78394"`);
        await queryRunner.query(`ALTER TABLE "packaging_stats" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "packaging_stats" DROP COLUMN "coompanyId"`);
        await queryRunner.query(`ALTER TABLE "daily_stats" DROP COLUMN "companyId"`);
        await queryRunner.query(`ALTER TABLE "product_stats" DROP COLUMN "companyId"`);
    }

}
