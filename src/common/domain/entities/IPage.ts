import type { IBase } from './IBase'
import type { IAeco } from './IAeco'

export interface IPage extends IBase {
  name: string
  metadata: Record<string, any>
  aecoId: number
  aeco: IAeco
}
