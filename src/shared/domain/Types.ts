import type { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'
import type { FileTypeEnum } from '../../upload/domain/enums/FileType.enum'

export interface IBaseS3 {
  key: string
}

export interface IUploadUrl {
  fileType: FileTypeEnum
  fileName: string
  pathFile: string
}

export interface IResponseUploadUrl extends IBaseS3 {
  url: string
}

export interface IResponseMessage {
  status: number
  message: string
}

export type BaseDecoded = {
  sub: string
  iat: number
  exp: number
}

/**
 * Represents decoded JWT user information.
 * @property {string} username - The user's username.
 * @property {string} sub - A unique identifier for the user (subject).
 * @property {number} iat - Token issue time (Unix timestamp).
 * @property {number} exp - Token expiration time (Unix timestamp).
 * @property {string} email - The user's email address.
 * @property {string} role - The user's role.
 * @property {RoleTypeEnum} roleType - The user's role type.
 * @property {string} entity - The user's entity.
 */
export type DecodedUser = BaseDecoded & {
  userId?: number
  username: string
  email: string
  roleType?: UserRoleEntiyEnum
  company?: {
    id: number
    name: string
  }
}

export type DecodedAeco = {
  aecoId: number
  aecoName: string
  aecoSerialNumber: string
  company?: {
    id: number
    name: string
  }
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P]
}
