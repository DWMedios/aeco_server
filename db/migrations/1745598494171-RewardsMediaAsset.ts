import { MigrationInterface, QueryRunner } from "typeorm";

export class RewardsMediaAsset1745598494171 implements MigrationInterface {
    name = 'RewardsMediaAsset1745598494171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards" RENAME COLUMN "image" TO "imageId"`);
        await queryRunner.query(`ALTER TABLE "rewards" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "rewards" ADD "imageId" integer`);
        await queryRunner.query(`ALTER TABLE "rewards" ADD CONSTRAINT "UQ_b5012cf75f62790862124b3682b" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "rewards" ADD CONSTRAINT "FK_b5012cf75f62790862124b3682b" FOREIGN KEY ("imageId") REFERENCES "media_assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards" DROP CONSTRAINT "FK_b5012cf75f62790862124b3682b"`);
        await queryRunner.query(`ALTER TABLE "rewards" DROP CONSTRAINT "UQ_b5012cf75f62790862124b3682b"`);
        await queryRunner.query(`ALTER TABLE "rewards" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "rewards" ADD "imageId" text`);
        await queryRunner.query(`ALTER TABLE "rewards" RENAME COLUMN "imageId" TO "image"`);
    }

}
