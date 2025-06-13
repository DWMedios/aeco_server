import { MigrationInterface, QueryRunner } from 'typeorm'

const companyTable = 'companies'
const aecoTable = 'aecos'
const companyRFC = 'XAXX010101012'
const aecoFolio = '00001'
const aecoSerialNumber = 'AECO123456'

export class CreateAecoSeeder1727733221625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const getCompanyByRfc = await queryRunner.query(
      `SELECT * FROM ${companyTable} WHERE rfc = '${companyRFC}' LIMIT 1`,
    )

    const companyId = getCompanyByRfc[0]?.id

    if (!companyId) console.error('Company not found')

    await queryRunner.query(
      `INSERT INTO ${aecoTable} (folio, name, status, "isOnline", "initialSetup", "needsUpdate", "serialNumber", "currentCoords", "companyId") 
        VALUES ('${aecoFolio}','AECO Main', 'enabled', true, true, true, '${aecoSerialNumber}', '{"latitude": 40.7128, "longitude": -74.006}', ${companyId})`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM ${aecoTable} WHERE rfc = '${companyRFC}' AND folio = '${aecoFolio}'`,
    )
  }
}
