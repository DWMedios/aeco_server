import { MigrationInterface, QueryRunner } from "typeorm";

export class UserInvitesEntity1754334430630 implements MigrationInterface {
    name = 'UserInvitesEntity1754334430630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_invites_status_enum" AS ENUM('pending', 'accepted', 'rejected', 'expired', 'cancelled')`);

        await queryRunner.query(`CREATE TABLE "user_invites" (
            "id" SERIAL NOT NULL, 
            "name" character varying(100) NOT NULL,
            "email" text NOT NULL,
            "status" "public"."user_invites_status_enum" NOT NULL DEFAULT 'pending',
            "token" text NOT NULL,
            "invitedById" integer,
            "invitedUserId" integer,
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
            "deletedAt" TIMESTAMP WITH TIME ZONE,
            CONSTRAINT "PK_32ea679531e84878e97446e8d3f" PRIMARY KEY ("id"))`);

        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT false`);

        await queryRunner.query(`ALTER TABLE "user_invites" ADD CONSTRAINT "FK_95c9f58bd4fd41f69a4be6215d4" FOREIGN KEY ("invitedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_invites" ADD CONSTRAINT "FK_ba144322f225b659396b478d17a" FOREIGN KEY ("invitedUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_invites" DROP CONSTRAINT "FK_ba144322f225b659396b478d17a"`);
        await queryRunner.query(`ALTER TABLE "user_invites" DROP CONSTRAINT "FK_95c9f58bd4fd41f69a4be6215d4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
        await queryRunner.query(`DROP TABLE "user_invites"`);
        await queryRunner.query(`DROP TYPE "public"."user_invites_status_enum"`);
    }

}
