import type { EntityManager } from 'typeorm'
import type { IMediaAsset } from '@common/domain/entities'

export const MEDIA_ASSET_REPOSITORY = Symbol('IMediaAssetRepository')

export interface IMediaAssetRepository {
  findById(id: number, manager?: EntityManager): Promise<IMediaAsset | null>
  findByKey(
    fileKey: string,
    manager?: EntityManager,
  ): Promise<IMediaAsset | null>
  findManyByCompanyId(
    companyId: number,
    manager?: EntityManager,
  ): Promise<IMediaAsset[]>
  create(
    media: Partial<IMediaAsset>,
    manager?: EntityManager,
  ): Promise<IMediaAsset>
  partialUpdate(
    exists: IMediaAsset,
    media: Partial<IMediaAsset>,
    manager?: EntityManager,
  ): Promise<IMediaAsset>
  updateById(
    id: number,
    media: Partial<IMediaAsset>,
    manager?: EntityManager,
  ): Promise<IMediaAsset>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
