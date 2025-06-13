import { MigrationInterface, QueryRunner } from "typeorm";

export class CampaginDatesChanged1745989476932 implements MigrationInterface {
    name = 'CampaginDatesChanged1745989476932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_b030a9d531ca3511c4a4963021c"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "contractorsId"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "startDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "endDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contractors" ADD CONSTRAINT "FK_fb55f60c7bc0cbc0d8f28da104c" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contractors" DROP CONSTRAINT "FK_fb55f60c7bc0cbc0d8f28da104c"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "contractorsId" integer`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_b030a9d531ca3511c4a4963021c" FOREIGN KEY ("contractorsId") REFERENCES "contractors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
