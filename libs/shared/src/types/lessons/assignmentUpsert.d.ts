/**
 * Components - Lessons - View - Components - Assignment - Forms - Upsert - Types
 */

// Types
import { Taxonomy } from '../../../../../../../types/taxonomy.d'

export interface AssignmentAnswerMetaType {
  type: string
  answer_types: string[]
}

export interface AssignmentAnswerSubmitType {
  meta: AssignmentAnswerMetaType
}

export interface CheckboxDataType {
  label: string
  value: string
}

export enum ANSWER_TYPE {
  Assignment = 'assignment'
}
