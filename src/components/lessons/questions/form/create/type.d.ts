/**
 * Components - Lessons - Questions - Form - Create - Types
 */

import { Taxonomy } from '../../../types/taxonomy'

export interface TaxonomyFormProps {
  type?: string
  isShowQuestionForm?: boolean
  defaultValues: Taxonomy | any
  onSuccess: () => void
}
