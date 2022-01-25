/**
 * Components - Lessons - Questions - Forms - Answers - Types
 */

// Types
import { Taxonomy } from '../../../../../../../../types/taxonomy.d'

interface AnswerFormType {
  filters: Partial<Taxonomy>
  defaultValues: Taxonomy[] | undefined
  onSuccess: () => void
}

interface FieldType {
  name: string
  isCorrect: boolean
}

export interface AnswersSubmitType {
  answers: FieldType[]
}
