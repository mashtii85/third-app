/**
 * Components - Selects - Select
 */

// React
import { memo } from 'react'

// UI
import { FormLabel, ReactSelectField } from '@drykiss/industry-ui'

// Types
import { SelectProps } from './types.d'
import { checkProps, getQuery } from './helpers'
import { useSelect } from './useSelect/useSelect'

export const Select = memo(
  ({
    control,
    defaultValue,
    errors,
    // entity,
    // entityId,
    isClearable = true,
    label = '',
    name,
    type,
    ...props
  }: SelectProps) => {
    const { query, variables = {} } = getQuery({
      type
    })
    const { loading, options } = useSelect(variables, query)

    return (
      <FormLabel id={name} label={label}>
        <ReactSelectField
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
      </FormLabel>
    )
  },
  checkProps
)
