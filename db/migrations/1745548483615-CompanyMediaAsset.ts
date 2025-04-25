import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyMediaAsset1745548483615 implements MigrationInterface {
    name = 'CompanyMediaAsset1745548483615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "metadata" jsonb`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "logoId" integer`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_652da5b265918d45aaba9d3a3a1" UNIQUE ("logoId")`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_652da5b265918d45aaba9d3a3a1" FOREIGN KEY ("logoId") REFERENCES "media_assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE IF EXISTS "company_settings"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_652da5b265918d45aaba9d3a3a1"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_652da5b265918d45aaba9d3a3a1"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "logoId"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "metadata"`);
    }

}
