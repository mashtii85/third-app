/**
 * Components - Taxonomy - Select
 */
// React
import { ReactNode } from 'react'
// Apollo
import { useTaxonomies } from '../hooks'
import { Control, FieldErrors } from 'react-hook-form'
// UI
import { FormLabel, ReactSelectField } from '@drykiss/industry-ui'
import { TAXONOMY_TYPE } from '../../../types/taxonomy'

interface TaxonomySelectProps {
  control: Control
  errors: FieldErrors
  label: string
  name: string
  register: ReactNode
  type: TAXONOMY_TYPE
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
    return taxonomies.map((taxonomy) => {
      return { label: taxonomy.name, value: taxonomy.id }
    })
  }

  const options = GetOptions()
  return options.length === 0 ? (
    <></>
  ) : (
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
