import { MigrationInterface, QueryRunner } from 'typeorm'

const companyTable = 'companies'
const companySettingsTable = 'company_settings'

export class CreateCompanySeeder1727731819942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO ${companyTable} (name, rfc) VALUES ('AECO Company', 'ACO123456ABC')`,
    )

    const getCompanyByRfc = await queryRunner.query(
      `SELECT * FROM ${companyTable} WHERE rfc = 'ACO123456ABC' LIMIT 1`,
    )

    const companyId = getCompanyByRfc[0]?.id

    if (!companyId) console.error('Company not found')

    await queryRunner.query(
      `INSERT INTO ${companySettingsTable} ("logoUrl", metadata, "companyId") VALUES ('https://example.com/logos/aeco_company.png', '{"defaultCurrency": "USD"}', ${companyId})`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const result = await queryRunner.query(
      `SELECT id FROM ${companyTable} WHERE rfc = 'ACO123456ABC' LIMIT 1`,
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
