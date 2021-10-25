/**
 * Components - Lessons - Questions - Form - Upsert - Types
 */

// Types
import { Taxonomy } from '../../../../../../../../types/taxonomy.d'

export enum QUESTION_TYPE {
  singleAnswer = 'singleAnswer',
  multipleAnswers = 'multipleAnswers'
}

export interface QUESTION_TYPE_DROPDOWN {
  text: 'Single Answer' | 'Multiple Answers'
  value: 'singleAnswer' | 'multipleAnswers'
}

export interface QuestionMetaType {
  type: QUESTION_TYPE_DROPDOWN
  score: number
}
export interface QuestionUpsertType {
  name: string
  meta?: QuestionMetaType
}

export interface QuestionUpsertFormType {
  filters: Partial<Taxonomy>
  defaultValues: QuestionUpsertType
  onSuccess: () => void
}
