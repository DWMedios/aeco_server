import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSettingsCompany1714379649111 implements MigrationInterface {
    name = 'AddSettingsCompany1714379649111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_settings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "logoUrl" character varying(100) NOT NULL, "colors" jsonb, "companyId" integer NOT NULL, CONSTRAINT "REL_474a36aafd4ff4a422eab6a3a9" UNIQUE ("companyId"), CONSTRAINT "PK_036b4634217db79c17305442dbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company_settings" ADD CONSTRAINT "FK_474a36aafd4ff4a422eab6a3a9d" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_settings" DROP CONSTRAINT "FK_474a36aafd4ff4a422eab6a3a9d"`);
        await queryRunner.query(`DROP TABLE "company_settings"`);
    }

}
