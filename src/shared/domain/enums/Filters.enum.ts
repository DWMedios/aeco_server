export type OrderByDirectionType = 'ASC' | 'DESC'
type BaseFiltersType = 'createdAt' | 'id'
export type OrderByFieldUserType = 'name' | 'email' | BaseFiltersType
export type OrderByFieldCompanyType =
  | 'name'
  | 'rfc'
  | 'state'
  | 'city'
  | 'postalCode'
  | 'phone'
  | BaseFiltersType

export type OrderByFieldAecoType = 'name' | 'folio' | 'status' | BaseFiltersType
export type OrderByFieldRewardType =
  | 'name'
  | 'order'
  | 'status'
  | 'establishment'
  | 'description'
  | BaseFiltersType

export type OrderByFieldProductCapacityType =
  | 'packaging'
  | 'weight'
  | 'factor'
  | 'description'
  | BaseFiltersType

export type OrderByFieldProductType =
  | 'code'
  | 'name'
  | 'family'
  | 'capacityId'
  | BaseFiltersType

export type OrderByFieldTicketType =
  | 'folio'
  | 'totalCans'
  | 'totalBottles'
  | 'aecoId'
  | 'productId'
  | BaseFiltersType
