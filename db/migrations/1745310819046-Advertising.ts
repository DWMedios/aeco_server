import { MigrationInterface, QueryRunner } from "typeorm";

export class Advertising1745310819046 implements MigrationInterface {
    name = 'Advertising1745310819046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media_assets" (
            "id" SERIAL NOT NULL, 
            "fileKey" character varying(200) NOT NULL, 
            "originalName" character varying(200) NOT NULL, 
            "mimeType" character varying(100) NOT NULL, 
            "fileSize" integer NOT NULL DEFAULT '0', 
            "assetType" character varying(100) NOT NULL, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_ca47e9f67a5e5d8af1e75d66ee6" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "campaigns" (
            "id" SERIAL NOT NULL, 
            "contractName" character varying(200) NOT NULL, 
            "description" character varying(200) NOT NULL, 
            "startDate" TIMESTAMP NOT NULL, 
            "endDate" TIMESTAMP NOT NULL, 
            "isEnabled" boolean NOT NULL DEFAULT false, 
            "mediaId" integer, 
            "contractorId" integer, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "REL_312bfc3ca8ccd1d7d64fec2455" UNIQUE ("mediaId"), 
            CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "contractors" (
            "id" SERIAL NOT NULL, 
            "name" character varying(200) NOT NULL, 
            "email" character varying(100) NOT NULL, 
            "phone" character varying(20) NOT NULL, 
            "logoId" integer, 
            "companyId" integer, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "REL_25a07818c705fb79b3ab2dc59a" UNIQUE ("logoId"), 
            CONSTRAINT "PK_6dbfde8813cdc4c4689f1e1e503" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "advertisings" (
            "id" SERIAL NOT NULL, 
            "isEnabled" boolean NOT NULL DEFAULT true, 
            "companyId" integer, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_d16adb7a4ffcb5caafed4930f9b" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "campaigns_aecos" (
            "campaignId" integer NOT NULL, 
            "aecoId" integer NOT NULL, 
            CONSTRAINT "PK_79976fbce1b37b511d66956d823" PRIMARY KEY ("campaignId", "aecoId"))`);

        await queryRunner.query(`CREATE INDEX "IDX_334603310331f8b66ce832044f" ON "campaigns_aecos" ("campaignId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b78f043ec823d06d61087af396" ON "campaigns_aecos" ("aecoId") `);
        
        await queryRunner.query(`CREATE TABLE "advertisings_contractors" (
            "advertisingId" integer NOT NULL, 
            "contractorId" integer NOT NULL, 
            CONSTRAINT "PK_b7b927eeb93f4ed983efe77cf6f" PRIMARY KEY ("advertisingId", "contractorId"))`);

        await queryRunner.query(`CREATE INDEX "IDX_2f5f93179b61cbc33a0948726f" ON "advertisings_contractors" ("advertisingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a0f4ccbdac0c0eda1bd61f82d1" ON "advertisings_contractors" ("contractorId") `);
        
        await queryRunner.query(`CREATE TABLE "advertisings_campaigns" (
            "advertisingId" integer NOT NULL, 
            "campaignId" integer NOT NULL, 
            CONSTRAINT "PK_1cfe76ca856cd49aa79c90795f0" PRIMARY KEY ("advertisingId", "campaignId"))`);

        await queryRunner.query(`CREATE INDEX "IDX_b6832d35469c6ef4febb7af175" ON "advertisings_campaigns" ("advertisingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_34b41d61affe519866efe90bb3" ON "advertisings_campaigns" ("campaignId") `);
        await queryRunner.query(`ALTER TABLE "companies" ADD "contractorsId" integer`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_312bfc3ca8ccd1d7d64fec24556" FOREIGN KEY ("mediaId") REFERENCES "media_assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_154d74c49a9693bce19ca5b9bc2" FOREIGN KEY ("contractorId") REFERENCES "contractors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contractors" ADD CONSTRAINT "FK_25a07818c705fb79b3ab2dc59ac" FOREIGN KEY ("logoId") REFERENCES "media_assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisings" ADD CONSTRAINT "FK_ff9b5f8e86fcd15c87b444baeeb" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_b030a9d531ca3511c4a4963021c" FOREIGN KEY ("contractorsId") REFERENCES "contractors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaigns_aecos" ADD CONSTRAINT "FK_334603310331f8b66ce832044f2" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "campaigns_aecos" ADD CONSTRAINT "FK_b78f043ec823d06d61087af3960" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisings_contractors" ADD CONSTRAINT "FK_2f5f93179b61cbc33a0948726f2" FOREIGN KEY ("advertisingId") REFERENCES "advertisings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "advertisings_contractors" ADD CONSTRAINT "FK_a0f4ccbdac0c0eda1bd61f82d16" FOREIGN KEY ("contractorId") REFERENCES "contractors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisings_campaigns" ADD CONSTRAINT "FK_b6832d35469c6ef4febb7af1751" FOREIGN KEY ("advertisingId") REFERENCES "advertisings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "advertisings_campaigns" ADD CONSTRAINT "FK_34b41d61affe519866efe90bb3a" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisings_campaigns" DROP CONSTRAINT "FK_34b41d61affe519866efe90bb3a"`);
        await queryRunner.query(`ALTER TABLE "advertisings_campaigns" DROP CONSTRAINT "FK_b6832d35469c6ef4febb7af1751"`);
        await queryRunner.query(`ALTER TABLE "advertisings_contractors" DROP CONSTRAINT "FK_a0f4ccbdac0c0eda1bd61f82d16"`);
        await queryRunner.query(`ALTER TABLE "advertisings_contractors" DROP CONSTRAINT "FK_2f5f93179b61cbc33a0948726f2"`);
        await queryRunner.query(`ALTER TABLE "campaigns_aecos" DROP CONSTRAINT "FK_b78f043ec823d06d61087af3960"`);
        await queryRunner.query(`ALTER TABLE "campaigns_aecos" DROP CONSTRAINT "FK_334603310331f8b66ce832044f2"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_b030a9d531ca3511c4a4963021c"`);
        await queryRunner.query(`ALTER TABLE "advertisings" DROP CONSTRAINT "FK_ff9b5f8e86fcd15c87b444baeeb"`);
        await queryRunner.query(`ALTER TABLE "contractors" DROP CONSTRAINT "FK_25a07818c705fb79b3ab2dc59ac"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_154d74c49a9693bce19ca5b9bc2"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_312bfc3ca8ccd1d7d64fec24556"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "contractorsId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34b41d61affe519866efe90bb3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b6832d35469c6ef4febb7af175"`);
        await queryRunner.query(`DROP TABLE "advertisings_campaigns"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0f4ccbdac0c0eda1bd61f82d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f5f93179b61cbc33a0948726f"`);
        await queryRunner.query(`DROP TABLE "advertisings_contractors"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b78f043ec823d06d61087af396"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_334603310331f8b66ce832044f"`);
        await queryRunner.query(`DROP TABLE "campaigns_aecos"`);
        await queryRunner.query(`DROP TABLE "advertisings"`);
        await queryRunner.query(`DROP TABLE "contractors"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP TABLE "media_assets"`);
    }

}
