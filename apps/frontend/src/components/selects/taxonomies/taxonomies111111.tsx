/**
 * Components - Taxonomy - Select
 */

// React
import { ReactNode } from 'react'

// Apollo
import { Control, FieldErrors } from 'react-hook-form'

// Hooks
import { useSelectTaxonomies } from '../../taxonomies/hooks/useSelectTaxonomies/useSelectTaxonomies'

// UI
import { Label, Select } from '@drykiss/industry-ui'
import { TAXONOMY_TYPE } from '../../../types/taxonomy'
import { STATUS_ACTIVE } from '../../../types/select.d'

interface TaxonomySelectProps {
  control: Control
  errors: FieldErrors
  label: string
  name: string
  register: ReactNode
  category: TAXONOMY_TYPE
}

export const TaxonomySelect121223 = ({
  control,
  errors,
  label,
  name,
  register,
  category: type,
  ...props
}: TaxonomySelectProps) => {
  const defaultOptions = {
    control,
    errors,
    register
  }

  const { options } = useSelectTaxonomies({ type: type, status: STATUS_ACTIVE.Active })

  return options.length === 0 ? (
    <></>
  ) : (
    <Label id={name} label={label}>
      <Select
        {...defaultOptions}
        cacheOptions
        isClearable
        options={options}
        name={name}
        {...props}
      />
    </Label>
  )
}
