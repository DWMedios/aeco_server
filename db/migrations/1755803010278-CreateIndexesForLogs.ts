import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIndexesForLogs1755803010278 implements MigrationInterface {
    name = 'CreateIndexesForLogs1755803010278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_f0569566e269d62322aad8e2ea" ON "aecos_request_history" ("aecoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca28adb96a453c4fbf1e1eddb3" ON "aecos" ("folio") `);
        await queryRunner.query(`CREATE INDEX "IDX_4289bf2d1ca794b0b488061203" ON "aecos" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_e71191c693d7d69a358286625b" ON "aecos" ("serialNumber") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf6e3dde705c8eadde9bd40230" ON "aecos" ("companyId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_cf6e3dde705c8eadde9bd40230"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e71191c693d7d69a358286625b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4289bf2d1ca794b0b488061203"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca28adb96a453c4fbf1e1eddb3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0569566e269d62322aad8e2ea"`);
    }

}
