import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserInvite1754849140191 implements MigrationInterface {
    name = 'FixUserInvite1754849140191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_invites" RENAME COLUMN "name" TO "inviteType"`);
        await queryRunner.query(`ALTER TABLE "user_invites" DROP COLUMN "inviteType"`);
        await queryRunner.query(`CREATE TYPE "public"."user_invites_invitetype_enum" AS ENUM('forgot_password', 'email_verification')`);
        await queryRunner.query(`ALTER TABLE "user_invites" ADD "inviteType" "public"."user_invites_invitetype_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_invites" DROP COLUMN "inviteType"`);
        await queryRunner.query(`DROP TYPE "public"."user_invites_invitetype_enum"`);
        await queryRunner.query(`ALTER TABLE "user_invites" ADD "inviteType" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_invites" RENAME COLUMN "inviteType" TO "name"`);
    }

}
