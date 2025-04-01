import type { IBase } from './IBase'
import type { IProductCapacity } from './IProductCapacity'

export interface IProduct extends IBase {
  readonly code: string
  readonly family: string
  readonly name: string
  readonly capacityId: number
  capacity: IProductCapacity
}
