// Types
import { ENTITIES } from '../constants/entities'
import { Medium } from './medium.d'
import { Options } from './options'
import { STATUS_ACTIVE } from './select.d'

export enum TAXONOMY_TYPE {
  Client = 'clients',
  Course = 'courses',
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
