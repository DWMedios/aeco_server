import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCompanyLongitude1755896959770 implements MigrationInterface {
    name = 'FixCompanyLongitude1755896959770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Cambiar el tipo y tamaño de la columna "name"
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "name" TYPE character varying(255)`);
        // Asegurarse de que siga siendo NOT NULL
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "name" SET NOT NULL`);

        // Para el campo "rfc", primero eliminar el índice único temporalmente
        await queryRunner.query(`DROP INDEX IF EXISTS "public"."companies_rfc_unique"`);

        // Cambiar el tipo y tamaño de la columna "rfc"
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "rfc" TYPE character varying(255)`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "rfc" SET NOT NULL`);

        // Volver a crear el índice único
        await queryRunner.query(`CREATE UNIQUE INDEX "companies_rfc_unique" ON "companies" ("rfc") WHERE "deletedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Eliminar el índice creado
        await queryRunner.query(`DROP INDEX IF EXISTS "public"."companies_rfc_unique"`);

        // Volver el campo "rfc" a su tamaño anterior
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "rfc" TYPE character varying(13)`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "rfc" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "companies_rfc_unique" ON "companies" ("rfc") WHERE ("deletedAt" IS NULL)`);

        // Volver el campo "name" a su tamaño anterior
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "name" TYPE character varying(100)`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "name" SET NOT NULL`);
    }
}
