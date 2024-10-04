import { MigrationInterface, QueryRunner } from 'typeorm'

const aecoTable = 'aecos'
const rewardsCategoriesTable = 'reward_categories'

export class CreateRewardsCategoriesSeeder1728077675846
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const getAeco = await queryRunner.query(
      `SELECT * FROM ${aecoTable} WHERE name = 'AECO Main' LIMIT 1`,
    )

    const aecoId = getAeco[0]?.id

    if (!aecoId) console.error('AECO not found')

    await queryRunner.query(
      `INSERT INTO ${rewardsCategoriesTable} (name, status, "order", "aecoId") VALUES 
            ('Predial', true, 1, ${aecoId}),
            ('Descuentos', true, 2, ${aecoId}),
            ('Tarjeta', true, 3, ${aecoId}),
            ('Donativo', true, 4, ${aecoId}),
            ('aecopuntos', true, 5, ${aecoId})`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const getAeco = await queryRunner.query(
      `SELECT * FROM ${aecoTable} WHERE name = 'AECO Main' LIMIT 1`,
    )

    const aecoId = getAeco[0]?.id

    if (!aecoId) console.error('AECO not found')

    await queryRunner.query(
      `DELETE FROM ${rewardsCategoriesTable} WHERE "aecoId" = ${aecoId}`,
    )
  }
}
