export interface IBaseS3 {
  key: string
}

export interface IUploadUrl {
  fileType: string
  fileName: string
}

export interface IResponseUploadUrl extends IBaseS3 {
  url: string
}

export interface IResponseMessage {
  status: number
  message: string
}
