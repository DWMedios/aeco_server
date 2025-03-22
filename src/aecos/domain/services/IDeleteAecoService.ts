export const DELETE_AECO_SERVICE = Symbol('IDeleteAecoService')

export interface IDeleteAecoService {
  run(id: number): Promise<{ success: boolean }>
}
