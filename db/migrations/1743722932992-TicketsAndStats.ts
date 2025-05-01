import { MigrationInterface, QueryRunner } from "typeorm";

export class TicketsAndStats1743722932992 implements MigrationInterface {
    name = 'TicketsAndStats1743722932992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_stats" (
            "id" SERIAL NOT NULL, 
            "totalCount" integer NOT NULL DEFAULT '0', 
            "productId" integer, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_7e42e0367a044aeed5997a1932e" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "ticket_items" (
            "id" SERIAL NOT NULL, 
            "quantity" integer NOT NULL DEFAULT '1', 
            "packagingType" character varying NOT NULL, 
            "ticketId" integer, 
            "productId" integer, 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_42c1d9799d0b98de1654a97ef1a" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "packaging_stats" (
            "id" SERIAL NOT NULL, 
            "packagingType" character varying(20) NOT NULL, 
            "totalCount" integer NOT NULL DEFAULT '0', 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_fbfaef283fbd36a17164e452286" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "daily_stats" (
            "id" SERIAL NOT NULL, 
            "totalTickets" integer NOT NULL DEFAULT '0', 
            "totalBottles" integer NOT NULL DEFAULT '0', 
            "totalCans" integer NOT NULL DEFAULT '0', 
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
            "deletedAt" TIMESTAMP WITH TIME ZONE, 
            CONSTRAINT "PK_d1830b57aa5fafc5cb26a09aa73" PRIMARY KEY ("id"))`);
            
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "folio"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "folio" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "UQ_a7ecdf58d46238138f1f4b0b437" UNIQUE ("folio")`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "method"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "method" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_stats" ADD CONSTRAINT "FK_0e3647bb671daa62ed421ceef55" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_items" ADD CONSTRAINT "FK_d229a0672a063c7eaa64720cd6a" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_items" ADD CONSTRAINT "FK_2ec75075e9b21be0c0ba42126ad" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_items" DROP CONSTRAINT "FK_2ec75075e9b21be0c0ba42126ad"`);
        await queryRunner.query(`ALTER TABLE "ticket_items" DROP CONSTRAINT "FK_d229a0672a063c7eaa64720cd6a"`);
        await queryRunner.query(`ALTER TABLE "product_stats" DROP CONSTRAINT "FK_0e3647bb671daa62ed421ceef55"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "method"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "method" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "UQ_a7ecdf58d46238138f1f4b0b437"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "folio"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "folio" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE "daily_stats"`);
        await queryRunner.query(`DROP TABLE "packaging_stats"`);
        await queryRunner.query(`DROP TABLE "ticket_items"`);
        await queryRunner.query(`DROP TABLE "product_stats"`);
    }

}
