import * as bcrypt from 'bcrypt'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { UserRole } from '../../src/common/infra/entities/Permission.entity'

const usersTable = 'users'
const permissionsTable = 'user_company_permissions'
const companyTable = 'companies'

export class CreateUsersSeeder1727734811500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminPassword = await bcrypt.hash('admin_password', 10)
    const userPassword = await bcrypt.hash('user_password', 10)

    await queryRunner.query(
      `INSERT INTO ${usersTable} (name, email, password, position)
        VALUES ('Admin User', 'admin@example.com', '${adminPassword}', 'Administrator')`,
    )

    await queryRunner.query(
      `INSERT INTO ${usersTable} (name, email, password, position)
        VALUES ('Regular User', 'user@example.com', '${userPassword}', 'Employee')`,
    )

    console.log('Users created')

    // create user permissions

    const adminUser = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'admin@example.com' LIMIT 1`,
    )

    const regularUser = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'user@example.com' LIMIT 1`,
    )

    const company = await queryRunner.query(
      `SELECT * FROM ${companyTable} WHERE rfc = 'ACO123456ABC' LIMIT 1`,
    )

    const adminUserId = adminUser[0]?.id
    const regularUserId = regularUser[0]?.id
    const companyId = company[0]?.id

    if (!adminUserId || !regularUserId || !companyId) {
      console.error('Users or company not found')
    }

    await queryRunner.query(
      `INSERT INTO ${permissionsTable} (permissions, role, "userId", "companyId")
        VALUES ('{"create_user": true, "edit_user": true, "delete_user": false, "view_reports": true}', '${UserRole.ADMIN}', ${adminUserId}, ${companyId})`,
    )

    await queryRunner.query(
      `INSERT INTO ${permissionsTable} (permissions, role, "userId", "companyId")
        VALUES ('{"create_user": false, "edit_user": false, "delete_user": false, "view_reports": true}', '${UserRole.USER}', ${regularUserId}, ${companyId})`,
    )

    console.log('Permissions created')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminUser = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'admin@example.com' LIMIT 1`,
    )

    const regularUser = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'user@example.com' LIMIT 1`,
    )

    const adminUserId = adminUser[0]?.id
    const regularUserId = regularUser[0]?.id

    if (!adminUserId || !regularUserId) {
      console.error('Users not found')
    }

    await queryRunner.query(
      `DELETE FROM ${permissionsTable} WHERE user_id = ${adminUserId}`,
    )
    await queryRunner.query(
      `DELETE FROM ${permissionsTable} WHERE user_id = ${regularUserId}`,
    )

    await queryRunner.query(
      `DELETE FROM ${usersTable} WHERE email = 'admin@example.com'`,
    )
    await queryRunner.query(
      `DELETE FROM ${usersTable} WHERE email = 'user@example.com'`,
    )

    console.log('Users deleted')
  }
}
