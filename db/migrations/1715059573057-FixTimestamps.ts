import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixTimestamps1715059573057 implements MigrationInterface {
  name = 'FixTimestamps1715059573057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ticket" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_company_permissions" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_settings" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "promotions" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "aecos" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "addresses" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
  }
}
