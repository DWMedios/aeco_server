import { MigrationInterface, QueryRunner } from 'typeorm'

const companyTable = 'companies'
const companySettingsTable = 'company_settings'
const companyRFC = 'XAXX010101012'

export class CreateCompanySeeder1727731819942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO ${companyTable} (name, rfc, state, city, address, "postalCode", phone, "legalRepresentative")
        VALUES ('AECO Company', '${companyRFC}', 'Jalisco', 'Guadalajara', 'Av. Vallarta 6503', '45020', '9994566778', 
        '{"name": "Juan Perez", "email": "elrepresentante@aeco.com", "phone": "9994566778", "position": "CEO"}')`,
    )

    const getCompanyByRfc = await queryRunner.query(
      `SELECT * FROM ${companyTable} WHERE rfc = '${companyRFC}' LIMIT 1`,
    )

    const companyId = getCompanyByRfc[0]?.id

    if (!companyId) console.error('Company not found')

    await queryRunner.query(
      `INSERT INTO ${companySettingsTable} ("key", metadata, "companyId") 
        VALUES ('71402166-9e0a-47d2-851a-322381b4c1cd', '{"defaultCurrency": "USD"}', ${companyId})`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const result = await queryRunner.query(
      `SELECT id FROM ${companyTable} WHERE rfc = '${companyRFC}' LIMIT 1`,
    )
    const companyId = result[0]?.id

    if (!companyId) console.error('Company not found')

    await queryRunner.query(
      `DELETE FROM ${companySettingsTable} WHERE  "companyId" = ${companyId}`,
    )
    await queryRunner.query(
      `DELETE FROM ${companyTable} WHERE id = ${companyId}`,
    )
  }
}
