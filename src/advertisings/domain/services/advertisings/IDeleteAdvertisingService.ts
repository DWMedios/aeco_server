export const DELETE_ADVERTISING_SERVICE = Symbol('IDeleteAdvertisingService')

export interface IDeleteAdvertisingService {
  run(id: number): Promise<{ success: boolean }>
}
