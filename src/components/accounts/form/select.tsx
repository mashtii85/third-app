/**
 * Components - Taxonomy - Select
 */
// React
import { ReactNode } from 'react'
// Apollo
import { useTaxonomies } from '../../categories/hooks/useTaxonomies'
import { Control, FieldErrors } from 'react-hook-form'
// UI
import { FormLabel, ReactSelectField } from '@drykiss/industry-ui'
import { Taxonomy } from '../../../types/taxonomy'

interface TaxonomySelectProps {
  control: Control
  errors: FieldErrors
  label: string
  name: string
  register: ReactNode
  type: string
}
export const TaxonomySelect = ({
  control,
  errors,
  label,
  name,
  register,
  type,
  ...props
}: TaxonomySelectProps) => {
  const defaultOptions = {
    control,
    errors,
    register
  }

  const GetOptions = () => {
    const { taxonomies } = useTaxonomies({ category: type })

    return taxonomies.map((i: Taxonomy) => {
      return { label: i.name, value: i.id }
    })
  }

  const options = GetOptions()

  return (
    <FormLabel id={name} label={label}>
      <ReactSelectField
        {...defaultOptions}
        cacheOptions
        isClearable
        options={options}
        name={name}
        {...props}
      />
    </FormLabel>
  )
}
