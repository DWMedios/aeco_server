import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration21742677065130 implements MigrationInterface {
    name = 'FirstMigration21742677065130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rewards_aecos" ("rewardId" integer NOT NULL, "aecoId" integer NOT NULL, CONSTRAINT "PK_f471ae5a198197d023f9d2f03c1" PRIMARY KEY ("rewardId", "aecoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d3d427b78bbc18e80fe2b0227" ON "rewards_aecos" ("rewardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_195f8f58d86caf60565dd1aeb9" ON "rewards_aecos" ("aecoId") `);
        await queryRunner.query(`ALTER TABLE "rewards_aecos" ADD CONSTRAINT "FK_5d3d427b78bbc18e80fe2b02275" FOREIGN KEY ("rewardId") REFERENCES "rewards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rewards_aecos" ADD CONSTRAINT "FK_195f8f58d86caf60565dd1aeb9a" FOREIGN KEY ("aecoId") REFERENCES "aecos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rewards_aecos" DROP CONSTRAINT "FK_195f8f58d86caf60565dd1aeb9a"`);
        await queryRunner.query(`ALTER TABLE "rewards_aecos" DROP CONSTRAINT "FK_5d3d427b78bbc18e80fe2b02275"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_195f8f58d86caf60565dd1aeb9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d3d427b78bbc18e80fe2b0227"`);
        await queryRunner.query(`DROP TABLE "rewards_aecos"`);
    }

}
