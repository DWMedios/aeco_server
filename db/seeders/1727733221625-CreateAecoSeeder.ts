import { MigrationInterface, QueryRunner } from 'typeorm'
import { AecoStatus } from '../../src/common/infra/entities/Aeco.entity'

const companyTable = 'companies'
const addressTable = 'addresses'
const aecoTable = 'aecos'

export class CreateAecoSeeder1727733221625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const getCompanyByRfc = await queryRunner.query(
      `SELECT * FROM ${companyTable} WHERE rfc = 'ACO123456ABC' LIMIT 1`,
    )

    const companyId = getCompanyByRfc[0]?.id

    if (!companyId) console.error('Company not found')

    await queryRunner.query(
      `INSERT INTO ${addressTable} ("postalCode", street, state, coords, geometry) 
        VALUES (12345, '123 Main St', 'Sample State', '{"latitude": 40.7128, "longitude": -74.006}', '[{"type": "Point", "coordinates": [-74.006, 40.7128]}]')`,
    )

    const getAddress = await queryRunner.query(
      `SELECT * FROM ${addressTable} WHERE "postalCode" = 12345 LIMIT 1`,
    )

    const addressId = getAddress[0]?.id

    if (!addressId) console.error('Address not found')

    await queryRunner.query(
      `INSERT INTO ${aecoTable} (name, status, "isOnline", "initialSetup", "needsUpdate", "serialNumber", "currentCoords", "companyId", "addressId") 
        VALUES ('AECO Main', '${AecoStatus.ENABLED}', true, true, true, 'AECO123456', '{"latitude": 40.7128, "longitude": -74.006}', ${companyId}, ${addressId})`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const getCompanyByRfc = await queryRunner.query(
      `SELECT * FROM ${companyTable} WHERE rfc = 'ACO123456ABC' LIMIT 1`,
    )

    const companyId = getCompanyByRfc[0]?.id

    if (!companyId) console.error('Company not found')

    await queryRunner.query(
      `DELETE FROM ${aecoTable} WHERE "companyId" = ${companyId}`,
    )

    await queryRunner.query(
      `DELETE FROM ${addressTable} WHERE "postalCode" = 12345`,
    )
  }
}
