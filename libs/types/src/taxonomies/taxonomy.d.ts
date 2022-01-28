// Constants
import { ENTITIES, STATUS_ACTIVE, TAXONOMY_TYPE } from '@availabletowork/constants'

// Types
import { Medium } from '../media'
import { Options } from '../general'

export interface CustomFields {
  input: string
  label: string
  options?: Options[]
  required: boolean
  inputType: string
  withTime: boolean
}

export interface Taxonomy {
  id?: number
  name?: string
  entity?: ENTITIES
  status: STATUS_ACTIVE
  type?: TAXONOMY_TYPE
  client_id?: number
  entity_id?: number
  parent_id?: number
  custom_fields: CustomFields
  data?: Taxonomy
  taxonomies?: Taxonomy[]
  media?: Medium[]
  meta?: any
}

export interface TaxonomyFilters {
  id?: number
  clientId?: number
  type?: TAXONOMY_TYPE | string | string[]
  parentId?: number
  parent_id?: number
  entity?: string
  entityId?: number
  status?: STATUS_ACTIVE
  isParent?: boolean
}
