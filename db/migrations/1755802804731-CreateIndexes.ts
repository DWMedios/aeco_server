import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIndexes1755802804731 implements MigrationInterface {
    name = 'CreateIndexes1755802804731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_b1d924acd25ed7030874f4dad0" ON "pages" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_d4b863432c01edb5e8f0f6c195" ON "product_capacities" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_e0d4954a9bdceab03d2f3deda4" ON "product_stats" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e3647bb671daa62ed421ceef5" ON "product_stats" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_24a03ec19ad43dce77464b7839" ON "product_stats" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f48f86b3cd06606d059bd9a2de" ON "product_stats" ("aecoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_63fcb3d8806a6efd53dbc67430" ON "products" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_e10d9ba47a62ffd8257870bae2" ON "ticket_items" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_e5a32949aaaa731c7ec0dc89e9" ON "tickets" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_8ee6033c212d0ac212cc654fd4" ON "tickets" ("aecoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb84e3cef7e102c3658e6d804e" ON "advertisings" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_31cce6e55ea79e7f62167e4dd9" ON "contractors" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_47113408609b94df6b7f29f37c" ON "campaigns" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_7ac07f8146b1b2d509a4a23b71" ON "media_assets" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ef39935f03ed3fd6c63163722" ON "rewards" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_47b5fd1c74c4e74743c6a74ee8" ON "daily_stats" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_17547609ffac7effffc66add47" ON "daily_stats" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1f83e3fcfeb5222d9dc8985637" ON "daily_stats" ("aecoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a058436a142500a9897bea660e" ON "packaging_stats" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_adab4bb96b4803920be74a89bd" ON "packaging_stats" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_47bf19c6990af53e440018abed" ON "packaging_stats" ("aecoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_928a8b4f997441092d91abdf7d" ON "aecos_request_history" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_2fe3cc8e9fc4317f9a55184e8e" ON "aecos" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_a0365502b055164bc8234ae6ff" ON "companies" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_aacb3bb0f220b577e42e63214d" ON "user_invites" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_204e9b624861ff4a5b26819210" ON "users" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_f594ad410aacdef118dd1e3bc5" ON "user_role_permissions" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_8e6a7b0a857adc8d9dcdea37f7" ON "aecos_attempts" ("createdAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_8e6a7b0a857adc8d9dcdea37f7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f594ad410aacdef118dd1e3bc5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_204e9b624861ff4a5b26819210"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aacb3bb0f220b577e42e63214d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0365502b055164bc8234ae6ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2fe3cc8e9fc4317f9a55184e8e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_928a8b4f997441092d91abdf7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47bf19c6990af53e440018abed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_adab4bb96b4803920be74a89bd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a058436a142500a9897bea660e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1f83e3fcfeb5222d9dc8985637"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17547609ffac7effffc66add47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47b5fd1c74c4e74743c6a74ee8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ef39935f03ed3fd6c63163722"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ac07f8146b1b2d509a4a23b71"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47113408609b94df6b7f29f37c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_31cce6e55ea79e7f62167e4dd9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb84e3cef7e102c3658e6d804e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ee6033c212d0ac212cc654fd4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5a32949aaaa731c7ec0dc89e9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e10d9ba47a62ffd8257870bae2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63fcb3d8806a6efd53dbc67430"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f48f86b3cd06606d059bd9a2de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24a03ec19ad43dce77464b7839"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e3647bb671daa62ed421ceef5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0d4954a9bdceab03d2f3deda4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d4b863432c01edb5e8f0f6c195"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b1d924acd25ed7030874f4dad0"`);
    }

}
