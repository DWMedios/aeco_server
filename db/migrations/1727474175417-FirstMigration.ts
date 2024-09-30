import { MigrationInterface, QueryRunner } from 'typeorm'

export class FirstMigration1727739171278 implements MigrationInterface {
  name = 'FirstMigration1727739171278'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "postalCode" integer NOT NULL, "street" character varying NOT NULL, "state" character varying NOT NULL, "coords" jsonb NOT NULL, "geometry" jsonb NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "pages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "metadata" jsonb, "aecoId" integer NOT NULL, CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "folio" character varying(100) NOT NULL, "method" character varying(100) NOT NULL, "summary" jsonb NOT NULL, "totalCans" integer NOT NULL DEFAULT '0', "totalBottles" integer NOT NULL DEFAULT '0', "aecoId" integer, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."aecos_status_enum" AS ENUM('enabled', 'disabled')`,
    )
    await queryRunner.query(
      `CREATE TABLE "aecos" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "status" "public"."aecos_status_enum" NOT NULL DEFAULT 'disabled', "isOnline" boolean NOT NULL DEFAULT false, "serialNumber" character varying NOT NULL, "currentCoords" jsonb NOT NULL, "companyId" integer NOT NULL, "addressId" integer NOT NULL, CONSTRAINT "UQ_e71191c693d7d69a358286625ba" UNIQUE ("serialNumber"), CONSTRAINT "PK_6587143ff4628dcad0daa021404" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "promotions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "order" integer NOT NULL DEFAULT '0', "name" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "changeQty" integer NOT NULL DEFAULT '0', "logoUrl" character varying(100) NOT NULL, "isEnabled" boolean NOT NULL DEFAULT false, "companyId" integer, CONSTRAINT "PK_380cecbbe3ac11f0e5a7c452c34" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "company_settings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "logoUrl" character varying(100) NOT NULL, "metadata" jsonb, "companyId" integer NOT NULL, CONSTRAINT "REL_474a36aafd4ff4a422eab6a3a9" UNIQUE ("companyId"), CONSTRAINT "PK_036b4634217db79c17305442dbe" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."user_company_permissions_role_enum" AS ENUM('admin', 'user', 'guest')`,
    )
    await queryRunner.query(
      `CREATE TABLE "user_company_permissions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "permissions" jsonb NOT NULL, "role" "public"."user_company_permissions_role_enum" NOT NULL, "userId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_009a581f526624f0dde6026a768" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "companies" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "rfc" character varying(13) NOT NULL, CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "UQ_c0eaf27eab430da819643655682" UNIQUE ("rfc"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "phone" character varying(20), "position" character varying(50), "photoUrl" character varying, "gender" character varying(20), "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "reward_categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "status" integer NOT NULL DEFAULT '0', "order" integer NOT NULL, CONSTRAINT "PK_5d22a5b77861b4464b0a3541534" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "rewards" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "image" character varying(100) NOT NULL, "order" integer NOT NULL DEFAULT '0', "status" integer NOT NULL DEFAULT '0', "metadata" jsonb, "aecoId" integer, "categoryId" integer, CONSTRAINT "PK_3d947441a48debeb9b7366f8b8c" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "promotions_aecos" ("promotionsId" integer NOT NULL, "aecosId" integer NOT NULL, CONSTRAINT "PK_5344935f988f798044d0ddf867e" PRIMARY KEY ("promotionsId", "aecosId"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_3c1c1194f8d78a5c3864d57306" ON "promotions_aecos" ("promotionsId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_fb0ff5e6fdd8c4872ce7b6c990" ON "promotions_aecos" ("aecosId") `,
    )
    await queryRunner.query(
      `CREATE TABLE "companies_users" ("companiesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_1d39df00108e9dce5dab8cd2ede" PRIMARY KEY ("companiesId", "usersId"))`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_0dccb27846f465f953da45116d" ON "companies_users" ("companiesId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_27f57cf3e8c869fadd4dd25e98" ON "companies_users" ("usersId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "pages" ADD CONSTRAINT "FK_22f6e7247f43a0bb0291b45022f" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "tickets" ADD CONSTRAINT "FK_8ee6033c212d0ac212cc654fd4f" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "aecos" ADD CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "aecos" ADD CONSTRAINT "FK_c1e6e3d7f21a7f4de7904fe62cb" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "promotions" ADD CONSTRAINT "FK_4edd7123977f29a33d1730f31b2" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "company_settings" ADD CONSTRAINT "FK_474a36aafd4ff4a422eab6a3a9d" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ADD CONSTRAINT "FK_92e0f63ddf1063e4e6c3bfdaefa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ADD CONSTRAINT "FK_c84c3b7d4b40994763b902739e6" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "rewards" ADD CONSTRAINT "FK_a55c926ce24800e3cbf9000885b" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "rewards" ADD CONSTRAINT "FK_28f7058a47f4d00613fcea20d82" FOREIGN KEY ("categoryId") REFERENCES "reward_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "promotions_aecos" ADD CONSTRAINT "FK_3c1c1194f8d78a5c3864d573062" FOREIGN KEY ("promotionsId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "promotions_aecos" ADD CONSTRAINT "FK_fb0ff5e6fdd8c4872ce7b6c990c" FOREIGN KEY ("aecosId") REFERENCES "aecos"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies_users" ADD CONSTRAINT "FK_0dccb27846f465f953da45116d9" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies_users" ADD CONSTRAINT "FK_27f57cf3e8c869fadd4dd25e984" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies_users" DROP CONSTRAINT "FK_27f57cf3e8c869fadd4dd25e984"`,
    )
    await queryRunner.query(
      `ALTER TABLE "companies_users" DROP CONSTRAINT "FK_0dccb27846f465f953da45116d9"`,
    )
    await queryRunner.query(
      `ALTER TABLE "promotions_aecos" DROP CONSTRAINT "FK_fb0ff5e6fdd8c4872ce7b6c990c"`,
    )
    await queryRunner.query(
      `ALTER TABLE "promotions_aecos" DROP CONSTRAINT "FK_3c1c1194f8d78a5c3864d573062"`,
    )
    await queryRunner.query(
      `ALTER TABLE "rewards" DROP CONSTRAINT "FK_28f7058a47f4d00613fcea20d82"`,
    )
    await queryRunner.query(
      `ALTER TABLE "rewards" DROP CONSTRAINT "FK_a55c926ce24800e3cbf9000885b"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" DROP CONSTRAINT "FK_c84c3b7d4b40994763b902739e6"`,
    )
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" DROP CONSTRAINT "FK_92e0f63ddf1063e4e6c3bfdaefa"`,
    )
    await queryRunner.query(
      `ALTER TABLE "company_settings" DROP CONSTRAINT "FK_474a36aafd4ff4a422eab6a3a9d"`,
    )
    await queryRunner.query(
      `ALTER TABLE "promotions" DROP CONSTRAINT "FK_4edd7123977f29a33d1730f31b2"`,
    )
    await queryRunner.query(
      `ALTER TABLE "aecos" DROP CONSTRAINT "FK_c1e6e3d7f21a7f4de7904fe62cb"`,
    )
    await queryRunner.query(
      `ALTER TABLE "aecos" DROP CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303"`,
    )
    await queryRunner.query(
      `ALTER TABLE "tickets" DROP CONSTRAINT "FK_8ee6033c212d0ac212cc654fd4f"`,
    )
    await queryRunner.query(
      `ALTER TABLE "pages" DROP CONSTRAINT "FK_22f6e7247f43a0bb0291b45022f"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_27f57cf3e8c869fadd4dd25e98"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0dccb27846f465f953da45116d"`,
    )
    await queryRunner.query(`DROP TABLE "companies_users"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fb0ff5e6fdd8c4872ce7b6c990"`,
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3c1c1194f8d78a5c3864d57306"`,
    )
    await queryRunner.query(`DROP TABLE "promotions_aecos"`)
    await queryRunner.query(`DROP TABLE "rewards"`)
    await queryRunner.query(`DROP TABLE "reward_categories"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TABLE "companies"`)
    await queryRunner.query(`DROP TABLE "user_company_permissions"`)
    await queryRunner.query(
      `DROP TYPE "public"."user_company_permissions_role_enum"`,
    )
    await queryRunner.query(`DROP TABLE "company_settings"`)
    await queryRunner.query(`DROP TABLE "promotions"`)
    await queryRunner.query(`DROP TABLE "aecos"`)
    await queryRunner.query(`DROP TYPE "public"."aecos_status_enum"`)
    await queryRunner.query(`DROP TABLE "tickets"`)
    await queryRunner.query(`DROP TABLE "pages"`)
    await queryRunner.query(`DROP TABLE "addresses"`)
  }
}
