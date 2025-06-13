import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAttempEnum1748410357724 implements MigrationInterface {
    name = 'FixAttempEnum1748410357724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."aecos_attempts_reason_enum" RENAME TO "aecos_attempts_reason_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."aecos_attempts_reason_enum" AS ENUM('unregistered', 'disabled', 'invalid_token', 'missing_api_key', 'invalid_api_key_format', 'invalid_api_key', 'service_error')`);
        await queryRunner.query(`ALTER TABLE "aecos_attempts" ALTER COLUMN "reason" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "aecos_attempts" ALTER COLUMN "reason" TYPE "public"."aecos_attempts_reason_enum" USING "reason"::"text"::"public"."aecos_attempts_reason_enum"`);
        await queryRunner.query(`ALTER TABLE "aecos_attempts" ALTER COLUMN "reason" SET DEFAULT 'disabled'`);
        await queryRunner.query(`DROP TYPE "public"."aecos_attempts_reason_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."aecos_attempts_reason_enum_old" AS ENUM('unregistered', 'disabled', 'invalid_token', 'missing_api_key', 'invalid_api_key_format', 'invalid_api_key')`);
        await queryRunner.query(`ALTER TABLE "aecos_attempts" ALTER COLUMN "reason" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "aecos_attempts" ALTER COLUMN "reason" TYPE "public"."aecos_attempts_reason_enum_old" USING "reason"::"text"::"public"."aecos_attempts_reason_enum_old"`);
        await queryRunner.query(`ALTER TABLE "aecos_attempts" ALTER COLUMN "reason" SET DEFAULT 'disabled'`);
        await queryRunner.query(`DROP TYPE "public"."aecos_attempts_reason_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."aecos_attempts_reason_enum_old" RENAME TO "aecos_attempts_reason_enum"`);
    }

}
