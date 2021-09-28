import { Control } from 'react-hook-form'
import { Taxonomy } from '../../../types/taxonomy'

export interface TaxonomyFormProps {
  type?: string
  isShowQuestionForm?: boolean
  defaultValues: Taxonomy | any
  onSuccess: () => void
}

interface CustomFieldFormProps {
  defaultOptions: { control: Control }
}
