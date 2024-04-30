import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPromotionsTable1714461759707 implements MigrationInterface {
  name = 'AddPromotionsTable1714461759707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "folio" character varying(100) NOT NULL, "method" character varying(100) NOT NULL, "summary" jsonb NOT NULL, "totalCans" integer NOT NULL DEFAULT '0', "totalBottles" integer NOT NULL DEFAULT '0', "aecoId" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "promotions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "order" integer NOT NULL DEFAULT '0', "name" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "changeQty" integer NOT NULL DEFAULT '0', "logoUrl" character varying(100) NOT NULL, "isEnabled" boolean NOT NULL DEFAULT false, "companyId" integer, CONSTRAINT "PK_380cecbbe3ac11f0e5a7c452c34" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "promotions_aecos" ("promotionsId" integer NOT NULL, "aecosId" integer NOT NULL, CONSTRAINT "PK_5344935f988f798044d0ddf867e" PRIMARY KEY ("promotionsId", "aecosId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3c1c1194f8d78a5c3864d57306" ON "promotions_aecos" ("promotionsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb0ff5e6fdd8c4872ce7b6c990" ON "promotions_aecos" ("aecosId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_05be29d9a2a1bb9f11158498f94" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ADD CONSTRAINT "FK_4edd7123977f29a33d1730f31b2" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions_aecos" ADD CONSTRAINT "FK_3c1c1194f8d78a5c3864d573062" FOREIGN KEY ("promotionsId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions_aecos" ADD CONSTRAINT "FK_fb0ff5e6fdd8c4872ce7b6c990c" FOREIGN KEY ("aecosId") REFERENCES "aecos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "promotions_aecos" DROP CONSTRAINT "FK_fb0ff5e6fdd8c4872ce7b6c990c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions_aecos" DROP CONSTRAINT "FK_3c1c1194f8d78a5c3864d573062"`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" DROP CONSTRAINT "FK_4edd7123977f29a33d1730f31b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_05be29d9a2a1bb9f11158498f94"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fb0ff5e6fdd8c4872ce7b6c990"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3c1c1194f8d78a5c3864d57306"`,
    );
    await queryRunner.query(`DROP TABLE "promotions_aecos"`);
    await queryRunner.query(`DROP TABLE "promotions"`);
    await queryRunner.query(`DROP TABLE "ticket"`);
  }
}
