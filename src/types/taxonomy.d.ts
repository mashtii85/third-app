export enum TAXONOMY_STATUS {
  Active = 'active',
  Inactive = 'inactive'
}

/* eslint-disable camelcase */
export interface Taxonomy {
  id: number
  name: string
  entity?: string
  status: TAXONOMY_STATUS
  type?: string
  client_id: number
  entity_id: number
}
