/**
 * Components - Selects - Select
 */

// React
import { memo } from 'react'

// UI
import { Label, ReactSelect } from '@drykiss/industry-ui'

// Types
import { SelectProps } from '@availabletowork/types'

// Helpers
import { checkProps, getQuery } from './helpers'

// Hooks
import { useSelect } from './useSelect/useSelect'

const Select = ({
  control,
  defaultValue,
  errors,
  // entityId,
  isClearable = true,
  label = '',
  name,
  entity,
  taxonomyType,
  ...props
}: SelectProps) => {
  const { query, variables: filters } = getQuery({
    type: entity,
    filters: { type: taxonomyType }
  })

  const { loading, options } = useSelect(filters, query)

  return (
    <Label id={name} label={label}>
      <ReactSelect
        cacheOptions
        control={control}
        defaultOptions
        errors={errors}
        isClearable={isClearable}
        key={defaultValue}
        isLoading={loading}
        options={options}
        name={name}
        {...props}
      />
    </Label>
  )
}
export const CustomSelect = memo(Select, checkProps)
