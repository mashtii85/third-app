/**
 * Components - Lessons - Questions - Forms - Answers - Types
 */

// Types
import { Taxonomy } from '../taxonomies'

interface AnswerFormType {
  filters?: Partial<Taxonomy>
  defaultValues: Taxonomy[]
  onSuccess: () => void
}
interface AssignmentAnswerFormType {
  filters?: Partial<Taxonomy>
  defaultValues: Partial<Taxonomy>
  onSuccess: () => void
}
interface FieldType {
  name: string
  isCorrect: boolean
}

export interface AnswersSubmitType {
  answers: FieldType[]
}
