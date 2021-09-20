import { Taxonomy } from '../../../types/taxonomy'

export interface TaxonomyFormProps {
  type?: string
  defaultValues: Taxonomy | any
  onSuccess: () => void
}
