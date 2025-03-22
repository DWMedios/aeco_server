import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1742339284994 implements MigrationInterface {
    name = 'FirstMigration1742339284994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "metadata" jsonb, "aecoId" integer NOT NULL, CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "folio" character varying(100) NOT NULL, "method" character varying(100) NOT NULL, "summary" jsonb, "totalCans" integer NOT NULL DEFAULT '0', "totalBottles" integer NOT NULL DEFAULT '0', "aecoId" integer, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rewards" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "image" character varying(100) NOT NULL, "order" integer NOT NULL DEFAULT '0', "status" boolean DEFAULT true, "metadata" jsonb, "categoryId" integer, CONSTRAINT "PK_3d947441a48debeb9b7366f8b8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reward_categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "status" boolean DEFAULT true, "order" integer NOT NULL, "aecoId" integer, CONSTRAINT "PK_5d22a5b77861b4464b0a3541534" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."aecos_status_enum" AS ENUM('enabled', 'disabled', 'suspended', 'deactivated', 'maintenance')`);
        await queryRunner.query(`CREATE TABLE "aecos" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "folio" character varying(100) NOT NULL, "name" character varying(100) NOT NULL, "status" "public"."aecos_status_enum" NOT NULL DEFAULT 'disabled', "isOnline" boolean NOT NULL DEFAULT false, "initialSetup" boolean NOT NULL DEFAULT true, "needsUpdate" boolean NOT NULL DEFAULT false, "serialNumber" text NOT NULL, "currentCoords" jsonb, "companyId" integer, CONSTRAINT "UQ_e71191c693d7d69a358286625ba" UNIQUE ("serialNumber"), CONSTRAINT "PK_6587143ff4628dcad0daa021404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promotions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "order" integer NOT NULL DEFAULT '0', "name" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "changeQty" integer NOT NULL DEFAULT '0', "logoUrl" character varying(100) NOT NULL, "isEnabled" boolean NOT NULL DEFAULT false, "companyId" integer, CONSTRAINT "PK_380cecbbe3ac11f0e5a7c452c34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_settings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "key" character varying(100), "metadata" jsonb, "companyId" integer NOT NULL, CONSTRAINT "REL_474a36aafd4ff4a422eab6a3a9" UNIQUE ("companyId"), CONSTRAINT "PK_036b4634217db79c17305442dbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "rfc" character varying(13) NOT NULL, "state" character varying(100), "city" character varying(100), "address" text, "postalCode" character varying(10), "phone" character varying(20), "legalRepresentative" jsonb, CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "UQ_c0eaf27eab430da819643655682" UNIQUE ("rfc"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "phone" character varying(20), "position" character varying(50), "password" text, "isActive" boolean NOT NULL DEFAULT true, "companyId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_permissions_role_enum" AS ENUM('super_admin', 'admin', 'operator', 'maintenance', 'recolector')`);
        await queryRunner.query(`CREATE TABLE "user_role_permissions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "permissions" jsonb, "role" "public"."user_role_permissions_role_enum" NOT NULL, "apiKey" text, "token" text, "userId" integer NOT NULL, CONSTRAINT "REL_c71e30123b2f74875093e6087a" UNIQUE ("userId"), CONSTRAINT "PK_420a5fa7fb38a884be42c60903e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promotions_aecos" ("promotionsId" integer NOT NULL, "aecosId" integer NOT NULL, CONSTRAINT "PK_5344935f988f798044d0ddf867e" PRIMARY KEY ("promotionsId", "aecosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c1c1194f8d78a5c3864d57306" ON "promotions_aecos" ("promotionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb0ff5e6fdd8c4872ce7b6c990" ON "promotions_aecos" ("aecosId") `);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_22f6e7247f43a0bb0291b45022f" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_8ee6033c212d0ac212cc654fd4f" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rewards" ADD CONSTRAINT "FK_28f7058a47f4d00613fcea20d82" FOREIGN KEY ("categoryId") REFERENCES "reward_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reward_categories" ADD CONSTRAINT "FK_95d4fca22c67025ad65ae1c1f72" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aecos" ADD CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotions" ADD CONSTRAINT "FK_4edd7123977f29a33d1730f31b2" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_settings" ADD CONSTRAINT "FK_474a36aafd4ff4a422eab6a3a9d" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6f9395c9037632a31107c8a9e58" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role_permissions" ADD CONSTRAINT "FK_c71e30123b2f74875093e6087a9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotions_aecos" ADD CONSTRAINT "FK_3c1c1194f8d78a5c3864d573062" FOREIGN KEY ("promotionsId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "promotions_aecos" ADD CONSTRAINT "FK_fb0ff5e6fdd8c4872ce7b6c990c" FOREIGN KEY ("aecosId") REFERENCES "aecos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotions_aecos" DROP CONSTRAINT "FK_fb0ff5e6fdd8c4872ce7b6c990c"`);
        await queryRunner.query(`ALTER TABLE "promotions_aecos" DROP CONSTRAINT "FK_3c1c1194f8d78a5c3864d573062"`);
        await queryRunner.query(`ALTER TABLE "user_role_permissions" DROP CONSTRAINT "FK_c71e30123b2f74875093e6087a9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6f9395c9037632a31107c8a9e58"`);
        await queryRunner.query(`ALTER TABLE "company_settings" DROP CONSTRAINT "FK_474a36aafd4ff4a422eab6a3a9d"`);
        await queryRunner.query(`ALTER TABLE "promotions" DROP CONSTRAINT "FK_4edd7123977f29a33d1730f31b2"`);
        await queryRunner.query(`ALTER TABLE "aecos" DROP CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303"`);
        await queryRunner.query(`ALTER TABLE "reward_categories" DROP CONSTRAINT "FK_95d4fca22c67025ad65ae1c1f72"`);
        await queryRunner.query(`ALTER TABLE "rewards" DROP CONSTRAINT "FK_28f7058a47f4d00613fcea20d82"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_8ee6033c212d0ac212cc654fd4f"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_22f6e7247f43a0bb0291b45022f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb0ff5e6fdd8c4872ce7b6c990"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c1c1194f8d78a5c3864d57306"`);
        await queryRunner.query(`DROP TABLE "promotions_aecos"`);
        await queryRunner.query(`DROP TABLE "user_role_permissions"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_permissions_role_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "company_settings"`);
        await queryRunner.query(`DROP TABLE "promotions"`);
        await queryRunner.query(`DROP TABLE "aecos"`);
        await queryRunner.query(`DROP TYPE "public"."aecos_status_enum"`);
        await queryRunner.query(`DROP TABLE "reward_categories"`);
        await queryRunner.query(`DROP TABLE "rewards"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "pages"`);
    }

}
