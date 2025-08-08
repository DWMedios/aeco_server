import * as bcrypt from 'bcrypt'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { UserRoleEntityEnum } from '@common/domain/enums/UserRole.enum'

const usersTable = 'users'
const permissionsTable = 'user_role_permissions'
const companyTable = 'companies'
const companyRFC = 'XAXX010101012'

export class CreateUsersSeeder1727734811500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const superAdminPassword = await bcrypt.hash('super_admin_password', 10)
    const adminPassword = await bcrypt.hash('admin_password', 10)
    const userPassword = await bcrypt.hash('user_password', 10)

    const company = await queryRunner.query(
      `SELECT * FROM ${companyTable} WHERE rfc = '${companyRFC}' LIMIT 1`,
    )

    const companyId = company[0]?.id

    if (!companyId) {
      console.error('Company not found')
    }

    // create super admin
    await queryRunner.query(
      `INSERT INTO ${usersTable} (name, email, phone, position, password)
        VALUES ('Super Admin', 'superadmin@example.com', '9993786949', 'Super Administrator', '${superAdminPassword}')`,
    )

    await queryRunner.query(
      `INSERT INTO ${usersTable} (name, email, phone, position, password, "companyId")
        VALUES ('Admin User', 'admin@example.com', '9993786949', 'Administrator', '${adminPassword}', ${companyId})`,
    )

    await queryRunner.query(
      `INSERT INTO ${usersTable} (name, email, phone, position, password, "companyId")
        VALUES ('Regular User', 'user@example.com', '9901023344', 'Employee', '${userPassword}', ${companyId})`,
    )

    console.log('Users created')

    // create user roles

    const superAdmin = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'superadmin@example.com' LIMIT 1`,
    )

    const adminUser = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'admin@example.com' LIMIT 1`,
    )

    const regularUser = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'user@example.com' LIMIT 1`,
    )

    const superAdminId = superAdmin[0]?.id
    const adminUserId = adminUser[0]?.id
    const regularUserId = regularUser[0]?.id

    if (!adminUserId || !regularUserId || !superAdminId) {
      console.error('Users not found')
    }

    await queryRunner.query(
      `INSERT INTO ${permissionsTable} (role, "userId", "apiKey")
        VALUES ('${UserRoleEntityEnum.SUPER_ADMIN}', ${superAdminId}, '${uuidv4()}')`,
    )

    await queryRunner.query(
      `INSERT INTO ${permissionsTable} (role, "userId", "apiKey")
        VALUES ('${UserRoleEntityEnum.ADMIN}', ${adminUserId}, '${uuidv4()}')`,
    )

    await queryRunner.query(
      `INSERT INTO ${permissionsTable} (role, "userId", "apiKey")
        VALUES ('${UserRoleEntityEnum.OPERATOR}', ${regularUserId}, '${uuidv4()}')`,
    )

    console.log('Permissions created')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const superAdmin = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'superadmin@example.com' LIMIT 1`,
    )

    const adminUser = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'admin@example.com' LIMIT 1`,
    )

    const regularUser = await queryRunner.query(
      `SELECT * FROM ${usersTable} WHERE email = 'user@example.com' LIMIT 1`,
    )

    const superAdminId = superAdmin[0]?.id
    const adminUserId = adminUser[0]?.id
    const regularUserId = regularUser[0]?.id

    if (!adminUserId || !regularUserId || !superAdminId) {
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
