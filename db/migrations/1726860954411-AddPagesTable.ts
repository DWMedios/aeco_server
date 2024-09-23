import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPagesTable1726860954411 implements MigrationInterface {
  name = 'AddPagesTable1726860954411';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pages" (
        "id" SERIAL NOT NULL, 
        "name" character varying NOT NULL, 
        "metadata" JSONB, 
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE,
        "aecoId" integer NOT NULL,
        CONSTRAINT "PK_pages_id" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `ALTER TABLE "pages" 
       ADD CONSTRAINT "FK_pages_aecoId" 
       FOREIGN KEY ("aecoId") 
       REFERENCES "aecos"("id") 
       ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pages" DROP CONSTRAINT "FK_pages_aecoId"`,
    );
    await queryRunner.query(`DROP TABLE "pages"`);
  }
}
