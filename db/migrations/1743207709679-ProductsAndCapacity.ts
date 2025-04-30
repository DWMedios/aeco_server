import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductsAndCapacity1743207709679 implements MigrationInterface {
    name = 'ProductsAndCapacity1743207709679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_capacities" (
            "id" SERIAL NOT NULL, 
            "packaging" character varying NOT NULL, 
            "weight" double precision NOT NULL, 
            "factor" integer NOT NULL, 
            "description" text, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_49799efe65ca597a9c54c28142a" PRIMARY KEY ("id"))`);
            
        await queryRunner.query(`CREATE TABLE "products" (
            "id" SERIAL NOT NULL, 
            "code" text NOT NULL, 
            "family" text NOT NULL, 
            "name" text NOT NULL, 
            "capacityId" integer NOT NULL, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "UQ_7cfc24d6c24f0ec91294003d6b8" UNIQUE ("code"), 
            CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);

        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_a62b90ac2918c56db6440e31cc7" FOREIGN KEY ("capacityId") REFERENCES "product_capacities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_a62b90ac2918c56db6440e31cc7"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "product_capacities"`);
    }

}
