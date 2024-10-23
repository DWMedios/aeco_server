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
