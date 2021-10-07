/**
 * Components - Lessons - Questions - Form - Upsert - Types
 */

import { Taxonomy } from '../../../../../types/taxonomy'

export interface TaxonomyFormProps {
  type?: string
  isShowQuestionForm?: boolean
  defaultValues: Taxonomy
  onSuccess: () => void
}
