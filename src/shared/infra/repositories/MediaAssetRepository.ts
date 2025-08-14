import type { EntityManager, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { MediaAsset } from '@common/infra/entities'
import type { IMediaAsset } from '@common/domain/entities'
import type { IMediaAssetRepository } from '@shared/domain/repositories/IMediaAssetRepository'
import { TransactionalRepository } from '../base/transactional.repository'

export class MediaAssetRepository
  extends TransactionalRepository<IMediaAsset>
  implements IMediaAssetRepository
{
  constructor(
    @InjectRepository(MediaAsset)
    readonly entityRepository: Repository<IMediaAsset>,
  ) {
    super(entityRepository)
  }

  findById(id: number, manager?: EntityManager): Promise<IMediaAsset | null> {
    return this.repository(manager).findOne({
      where: { id },
    })
  }

  findByKey(
    fileKey: string,
    manager?: EntityManager,
  ): Promise<IMediaAsset | null> {
    return this.repository(manager).findOne({
      where: { fileKey },
    })
  }

  findManyByCompanyId(
    companyId: number,
    manager?: EntityManager,
  ): Promise<IMediaAsset[]> {
    return this.repository(manager)
      .createQueryBuilder('media')
      .leftJoinAndSelect('media.campaignMedia', 'campaignMedia')
      .leftJoinAndSelect('media.contractorLogo', 'contractorLogo')
      .leftJoinAndSelect('media.companyLogo', 'companyLogo')
      .leftJoinAndSelect('media.userImage', 'userImage')
      .where('media.companyLogo.id = :companyId', { companyId })
      .orWhere('media.contractorLogo.companyId = :companyId', { companyId })
      .orWhere('media.campaignMedia.companyId = :companyId', { companyId })
      .orWhere('media.userImage.companyId = :companyId', { companyId })
      .select([
        'media.id',
        'media.fileKey',
        'campaignMedia.id',
        'contractorLogo.id',
        'companyLogo.id',
        'userImage.id',
      ])
      .getMany()
  }

  create(
    media: Partial<IMediaAsset>,
    manager?: EntityManager,
  ): Promise<IMediaAsset> {
    const newMedia = this.repository(manager).create(media)
    return this.repository(manager).save(newMedia)
  }

  partialUpdate(
    exists: IMediaAsset,
    media: Partial<IMediaAsset>,
    manager?: EntityManager,
  ): Promise<IMediaAsset> {
    const updatedMedia = this.repository(manager).merge(exists, media)
    return this.repository(manager).save(updatedMedia)
  }

  async updateById(
    id: number,
    media: Partial<IMediaAsset>,
    manager?: EntityManager,
  ): Promise<IMediaAsset> {
    const qb = await this.repository(manager)
      .createQueryBuilder('media')
      .update()
      .set(media)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('media')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('media')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('media')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
