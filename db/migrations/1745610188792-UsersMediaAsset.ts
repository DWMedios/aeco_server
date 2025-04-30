import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersMediaAsset1745610188792 implements MigrationInterface {
    name = 'UsersMediaAsset1745610188792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "imageId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_0b9cf86bd47b4393165e9bddf3c" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0b9cf86bd47b4393165e9bddf3c" FOREIGN KEY ("imageId") REFERENCES "media_assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0b9cf86bd47b4393165e9bddf3c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_0b9cf86bd47b4393165e9bddf3c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "imageId"`);
    }

}
