import { MigrationInterface, QueryRunner } from "typeorm";

export class FixStats1744329072080 implements MigrationInterface {
    name = 'FixStats1744329072080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_stats" ADD "aecoId" integer`);
        await queryRunner.query(`ALTER TABLE "daily_stats" ADD "aecoId" integer`);
        await queryRunner.query(`ALTER TABLE "packaging_stats" ADD "aecoId" integer`);
        await queryRunner.query(`ALTER TABLE "product_stats" ADD CONSTRAINT "FK_f48f86b3cd06606d059bd9a2de9" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "daily_stats" ADD CONSTRAINT "FK_1f83e3fcfeb5222d9dc89856374" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "packaging_stats" ADD CONSTRAINT "FK_47bf19c6990af53e440018abed4" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "packaging_stats" DROP CONSTRAINT "FK_47bf19c6990af53e440018abed4"`);
        await queryRunner.query(`ALTER TABLE "daily_stats" DROP CONSTRAINT "FK_1f83e3fcfeb5222d9dc89856374"`);
        await queryRunner.query(`ALTER TABLE "product_stats" DROP CONSTRAINT "FK_f48f86b3cd06606d059bd9a2de9"`);
        await queryRunner.query(`ALTER TABLE "packaging_stats" DROP COLUMN "aecoId"`);
        await queryRunner.query(`ALTER TABLE "daily_stats" DROP COLUMN "aecoId"`);
        await queryRunner.query(`ALTER TABLE "product_stats" DROP COLUMN "aecoId"`);
    }

}
