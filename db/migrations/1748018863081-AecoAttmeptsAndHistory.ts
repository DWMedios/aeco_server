import { MigrationInterface, QueryRunner } from "typeorm";

export class AecoAttmeptsAndHistory1748018863081 implements MigrationInterface {
    name = 'AecoAttmeptsAndHistory1748018863081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aecos_request_history" (
            "id" SERIAL NOT NULL, 
            "endpoint" text NOT NULL, 
            "method" text NOT NULL, 
            "ipAddress" text, 
            "queryParams" jsonb, 
            "requestBody" jsonb, 
            "geolocation" jsonb, 
            "aecoId" integer, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_78620aea0ebb6f74b0db3bd2ee7" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE INDEX "IDX_7145589a9024081413aedd2f87" ON "aecos_request_history" ("endpoint") `);
        await queryRunner.query(`CREATE TYPE "public"."aecos_attempts_reason_enum" 
            AS ENUM('unregistered', 'disabled', 'invalid_token', 'missing_api_key', 'invalid_api_key_format', 'invalid_api_key')`);

        await queryRunner.query(`CREATE TABLE "aecos_attempts" (
            "id" SERIAL NOT NULL, 
            "serialNumber" text NOT NULL, 
            "ipAddress" text, 
            "reason" "public"."aecos_attempts_reason_enum" NOT NULL DEFAULT 'disabled', 
            "requestData" jsonb, 
            "geolocation" jsonb, 
            "errorMessage" text, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_a75598783f1d0aec8651ff0b2dc" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE INDEX "IDX_63473416a8f99017fac04ec600" ON "aecos_attempts" ("serialNumber") `);
        await queryRunner.query(`CREATE INDEX "IDX_2756ccee217113de1cc78c8b61" ON "aecos_attempts" ("ipAddress") `);
        await queryRunner.query(`ALTER TABLE "aecos" ADD "lastConnection" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "aecos_request_history" ADD CONSTRAINT "FK_f0569566e269d62322aad8e2ea3" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aecos_request_history" DROP CONSTRAINT "FK_f0569566e269d62322aad8e2ea3"`);
        await queryRunner.query(`ALTER TABLE "aecos" DROP COLUMN "lastConnection"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2756ccee217113de1cc78c8b61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63473416a8f99017fac04ec600"`);
        await queryRunner.query(`DROP TABLE "aecos_attempts"`);
        await queryRunner.query(`DROP TYPE "public"."aecos_attempts_reason_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7145589a9024081413aedd2f87"`);
        await queryRunner.query(`DROP TABLE "aecos_request_history"`);
    }

}
