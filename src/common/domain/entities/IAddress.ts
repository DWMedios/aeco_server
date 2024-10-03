import type { IBase } from './IBase'
import type { IAeco } from './IAeco'

export interface IAddress extends IBase {
  postalCode: number
  street: string
  state: string
  coords: Record<string, any>
  geometry: Record<string, any>[]
  aecos?: IAeco[] | null
}
