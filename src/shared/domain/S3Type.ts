export interface IBaseS3 {
  key: string
}

export interface IUploadUrl {
  fileType: string
  fileName: string
}

export interface IResponseUploadUrl {
  url: string
  key: string
}
