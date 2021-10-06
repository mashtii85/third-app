export interface Options {
  label: string
  value: string
}

export enum TAXONOMY_TYPE {
  CLIENT = 'clients',
  COURSE = 'courses',
  MEMBER = 'members',
  LOCATION = 'locations'
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
  status: TAXONOMY_STATUS
  type?: string
  client_id?: number
  entity_id?: number
  parent_id?: number
  custom_fields: CustomFields
  data?: Taxonomy
}
