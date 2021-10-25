// Types
import { Options } from './options'
import { STATUS_ACTIVE } from './select.d'

export enum TAXONOMY_TYPE {
  CLIENT = 'clients',
  COURSE = 'courses',
  MEMBER = 'members',
  LOCATION = 'locations',
  EVENT = 'events'
}

export interface CustomFields {
  input: string
  label: string
  options?: Options[]
  required: boolean
  inputType: string
}
export interface Taxonomy {
  id?: number
  name?: string
  entity?: string
  status: STATUS_ACTIVE
  type?: string
  client_id?: number
  entity_id?: number
  parent_id?: number
  custom_fields: CustomFields
  data?: Taxonomy
}
