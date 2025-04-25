import type { IBase } from './IBase'
import type { IAeco } from './IAeco'
import type { IAdvertising } from './IAdvertising'
import type { IContractor } from './IContractor'
import type { IReward } from './IReward'
import type { IUser } from './IUser'
import type { IMediaAsset } from './IMediaAsset'

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
  metadata?: Record<string, any>
  readonly logoId?: number
  users?: IUser[]
  mediaAsset?: IMediaAsset
  rewards?: IReward[]
  aecos?: IAeco[]
  advertisings?: IAdvertising[]
  contractors?: IContractor[]
  readonly totalAecos?: number
}

export interface ILegalRepresentative {
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly position: string
}
