export const DELETE_FILE_SERVICE = Symbol('IDeleteFileService')

export interface IDeleteFileService {
  run(key: string): Promise<{ success: boolean }>
}
