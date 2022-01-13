/**
 * Components - Selects - GroupEntity - Types.d
 */

// React
import { ReactNode } from 'react'

// Apollo
import { Control, FieldErrors } from 'react-hook-form'

// UI
import { TaxonomyFilters } from '../../taxonomies/hooks/useTaxonomies/types'

export interface GroupSelectProps {
  control: Control
  errors: FieldErrors
  label: string
  name: string
  register: ReactNode
  filters?: TaxonomyFilters
}
