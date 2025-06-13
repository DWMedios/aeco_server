import { MigrationInterface, QueryRunner } from "typeorm";

export class CampaginCompanyRelationAdded1746028154772 implements MigrationInterface {
    name = 'CampaginCompanyRelationAdded1746028154772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_cde6a8909bc8d8f370235927ba2" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_cde6a8909bc8d8f370235927ba2"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "companyId"`);
    }

}
