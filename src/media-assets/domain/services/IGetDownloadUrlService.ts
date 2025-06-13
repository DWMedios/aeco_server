export const GET_DOWNLOAD_URL_SERVICE = Symbol('IGetDownloadUrlService')

export interface IGetDownloadUrlService {
  run(fileKey: string): Promise<{ url: string }>
}
