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
