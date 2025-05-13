import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCompanyUnique1747104617076 implements MigrationInterface {
    name = 'FixCompanyUnique1747104617076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "UQ_c0eaf27eab430da819643655682"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "companies_rfc_unique" ON "companies" ("rfc") WHERE "deletedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."companies_rfc_unique"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_c0eaf27eab430da819643655682" UNIQUE ("rfc")`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name")`);
    }

}
