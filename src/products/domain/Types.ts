export interface ProductFilterByOptions {
  readonly name?: string
  readonly family?: string
  readonly code?: string
  readonly capacityId?: string
}

export interface ProductCapacityFilterByOptions {
  readonly packaging?: string
  readonly weight?: number
  readonly factor?: number
  readonly description?: string
}
