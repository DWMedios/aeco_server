import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCompanyRewards1725394031658 implements MigrationInterface {
  name = 'FixCompanyRewards1725394031658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company_settings" RENAME COLUMN "colors" TO "metadata"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" RENAME COLUMN "metadata" TO "colors"`,
    );
    await queryRunner.query(
      `CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "folio" character varying(100) NOT NULL, "method" character varying(100) NOT NULL, "summary" jsonb NOT NULL, "totalCans" integer NOT NULL DEFAULT '0', "totalBottles" integer NOT NULL DEFAULT '0', "aecoId" integer, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reward_categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "folio" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_5d22a5b77861b4464b0a3541534" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rewards" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "icon" character varying(100) NOT NULL, "order" integer NOT NULL DEFAULT '0', "status" integer NOT NULL DEFAULT '0', "aecoId" integer, "categoryId" integer, CONSTRAINT "PK_3d947441a48debeb9b7366f8b8c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" DROP COLUMN "colors"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ADD "metadata" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ADD "colors" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_8ee6033c212d0ac212cc654fd4f" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rewards" ADD CONSTRAINT "FK_a55c926ce24800e3cbf9000885b" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rewards" ADD CONSTRAINT "FK_28f7058a47f4d00613fcea20d82" FOREIGN KEY ("categoryId") REFERENCES "reward_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rewards" DROP CONSTRAINT "FK_28f7058a47f4d00613fcea20d82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rewards" DROP CONSTRAINT "FK_a55c926ce24800e3cbf9000885b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "FK_8ee6033c212d0ac212cc654fd4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" DROP COLUMN "colors"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" DROP COLUMN "metadata"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ADD "colors" jsonb`,
    );
    await queryRunner.query(`DROP TABLE "rewards"`);
    await queryRunner.query(`DROP TABLE "reward_categories"`);
    await queryRunner.query(`DROP TABLE "tickets"`);
    await queryRunner.query(
      `ALTER TABLE "company_settings" RENAME COLUMN "colors" TO "metadata"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" RENAME COLUMN "metadata" TO "colors"`,
    );
  }
}
