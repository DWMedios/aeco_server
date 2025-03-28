import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyToReward1743121455661 implements MigrationInterface {
    name = 'AddCompanyToReward1743121455661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "rewards" ADD CONSTRAINT "FK_2aac5326be6e30e30e0aba6b630" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards" DROP CONSTRAINT "FK_2aac5326be6e30e30e0aba6b630"`);
        await queryRunner.query(`ALTER TABLE "rewards" DROP COLUMN "companyId"`);
    }

}
