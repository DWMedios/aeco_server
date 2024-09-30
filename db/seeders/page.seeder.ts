import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'
import { Aeco } from '../../src/common/infra/entities/Aeco.entity'
import { Page } from '../../src/common/infra/entities/Page.entity'

export default class PageSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const pageRepository = dataSource.getRepository(Page)
    const aecoRepository = dataSource.getRepository(Aeco)

    const aeco = await aecoRepository.findOne({ where: {} })
    if (!aeco) {
      throw new Error('No Aeco found. Please run the AecoSeeder first.')
    }

    const pages = [
      {
        name: 'Home',
        metadata: [{ title: 'Welcome to our home page', slug: 'home' }],
        aecoId: aeco.id,
      },
      {
        name: 'About Us',
        metadata: [{ title: 'Learn more about our company', slug: 'about-us' }],
        aecoId: aeco.id,
      },
      {
        name: 'Contact',
        metadata: [{ title: 'Get in touch with us', slug: 'contact' }],
        aecoId: aeco.id,
      },
    ]

    for (const pageData of pages) {
      const page = pageRepository.create(pageData)
      await pageRepository.save(page)
    }
  }
}
