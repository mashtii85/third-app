/**
 * Components - Taxonomy - Forms - Upsert - Type
 */

import { Taxonomy } from '.'

export interface TaxonomyFormProps {
  type?: string
  isShowQuestionForm?: boolean
  defaultValues: Taxonomy | any
  onSuccess: () => void
}
