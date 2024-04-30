import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompanyTable1714378357261 implements MigrationInterface {
  name = 'AddCompanyTable1714378357261';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "companies" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(100) NOT NULL, "rfc" character varying(13) NOT NULL, CONSTRAINT "UQ_c0eaf27eab430da819643655682" UNIQUE ("rfc"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "companies_users" ("companiesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_1d39df00108e9dce5dab8cd2ede" PRIMARY KEY ("companiesId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0dccb27846f465f953da45116d" ON "companies_users" ("companiesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_27f57cf3e8c869fadd4dd25e98" ON "companies_users" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "companies_users" ADD CONSTRAINT "FK_0dccb27846f465f953da45116d9" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies_users" ADD CONSTRAINT "FK_27f57cf3e8c869fadd4dd25e984" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies_users" DROP CONSTRAINT "FK_27f57cf3e8c869fadd4dd25e984"`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies_users" DROP CONSTRAINT "FK_0dccb27846f465f953da45116d9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_27f57cf3e8c869fadd4dd25e98"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0dccb27846f465f953da45116d"`,
    );
    await queryRunner.query(`DROP TABLE "companies_users"`);
    await queryRunner.query(`DROP TABLE "companies"`);
  }
}
