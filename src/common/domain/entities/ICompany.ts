import type { IAeco } from './IAeco'
import type { IBase } from './IBase'
import type { ISetting } from './ICompanySetting'
import type { IPromotion } from './IPromotion'
import type { IReward } from './IReward'
import type { IUser } from './IUser'

export interface ICompany extends IBase {
  readonly name: string
  readonly rfc: string
  readonly state?: string
  readonly city?: string
  readonly address?: string
  readonly postalCode?: string
  readonly phone?: string
  legalRepresentative?: ILegalRepresentative
  readonly status: boolean
  users?: IUser[]
  settings?: ISetting
  rewards?: IReward[]
  aecos?: IAeco[]
  promotions?: IPromotion[]
  readonly totalAecos?: number
}

export interface ILegalRepresentative {
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly position: string
}
