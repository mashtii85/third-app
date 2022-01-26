// Types
import { ENTITIES } from '../../constants'
import { Medium } from './medium'
import { Options } from './options'
import { STATUS_ACTIVE } from './select.d'

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
