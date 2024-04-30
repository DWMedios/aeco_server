import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAecoTable1714460924139 implements MigrationInterface {
    name = 'AddAecoTable1714460924139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "postalCode" integer NOT NULL, "street" character varying NOT NULL, "state" character varying NOT NULL, "coords" jsonb NOT NULL, "geometry" jsonb array NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."aecos_status_enum" AS ENUM('enabled', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "aecos" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying NOT NULL, "status" "public"."aecos_status_enum" NOT NULL DEFAULT 'disabled', "isOnline" boolean NOT NULL DEFAULT false, "currentCoords" jsonb NOT NULL, "companyId" integer, "addressId" integer, CONSTRAINT "PK_6587143ff4628dcad0daa021404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aecos" ADD CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aecos" ADD CONSTRAINT "FK_c1e6e3d7f21a7f4de7904fe62cb" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aecos" DROP CONSTRAINT "FK_c1e6e3d7f21a7f4de7904fe62cb"`);
        await queryRunner.query(`ALTER TABLE "aecos" DROP CONSTRAINT "FK_cf6e3dde705c8eadde9bd402303"`);
        await queryRunner.query(`DROP TABLE "aecos"`);
        await queryRunner.query(`DROP TYPE "public"."aecos_status_enum"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
