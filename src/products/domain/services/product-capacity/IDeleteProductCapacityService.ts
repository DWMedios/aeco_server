export const DELETE_PRODUCT_CAPACITY_SERVICE = Symbol(
  'IDeleteProductCapacityService',
)

export interface IDeleteProductCapacityService {
  run(id: number): Promise<{ success: boolean }>
}
