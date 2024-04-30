import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsePremrissionsTable1714453280734
  implements MigrationInterface
{
  name = 'AddUsePremrissionsTable1714453280734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_company_permissions_role_enum" AS ENUM('admin', 'user', 'guest')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_company_permissions" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "permissions" jsonb array NOT NULL, "role" "public"."user_company_permissions_role_enum" NOT NULL, "userId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_009a581f526624f0dde6026a768" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ADD CONSTRAINT "FK_92e0f63ddf1063e4e6c3bfdaefa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ADD CONSTRAINT "FK_c84c3b7d4b40994763b902739e6" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" DROP CONSTRAINT "FK_c84c3b7d4b40994763b902739e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" DROP CONSTRAINT "FK_92e0f63ddf1063e4e6c3bfdaefa"`,
    );
    await queryRunner.query(`DROP TABLE "user_company_permissions"`);
    await queryRunner.query(
      `DROP TYPE "public"."user_company_permissions_role_enum"`,
    );
  }
}
