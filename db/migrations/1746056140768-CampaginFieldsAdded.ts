import { MigrationInterface, QueryRunner } from "typeorm";

export class CampaginFieldsAdded1746056140768 implements MigrationInterface {
    name = 'CampaginFieldsAdded1746056140768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "planDescription" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "reproductionLimit" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD "planDurationDays" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "planDurationDays"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "reproductionLimit"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP COLUMN "planDescription"`);
    }

}
