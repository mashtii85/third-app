// Types
import { ENTITIES } from '../../constants'
import { Medium } from '../media'
import { Options, STATUS_ACTIVE } from '../general'

export enum TAXONOMY_TYPE {
  Client = 'clients',
  Course = 'courses',
  CustomFields = 'custom-fields',
  Member = 'members',
  Location = 'locations',
  Event = 'events',
  LessonQuestions = 'lesson-questions',
  LessonAnswers = 'lesson-answers'
}

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
