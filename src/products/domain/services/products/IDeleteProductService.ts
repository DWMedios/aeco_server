export const DELETE_PRODUCT_SERVICE = Symbol('IDeleteProductService')

export interface IDeleteProductService {
  run(id: number): Promise<{ success: boolean }>
}
