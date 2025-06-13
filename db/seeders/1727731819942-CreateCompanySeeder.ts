import { MigrationInterface, QueryRunner } from 'typeorm'

const companyTable = 'companies'
const companyRFC = 'XAXX010101012'

export class CreateCompanySeeder1727731819942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO ${companyTable} (name, rfc, state, city, address, "postalCode", phone, "legalRepresentative")
        VALUES ('AECO Company', '${companyRFC}', 'Jalisco', 'Guadalajara', 'Av. Vallarta 6503', '45020', '9994566778', 
        '{"name": "Juan Perez", "email": "elrepresentante@aeco.com", "phone": "9994566778", "position": "CEO"}')`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM ${companyTable} WHERE rfc = '${companyRFC}'`,
    )
  }
}
