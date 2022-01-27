/**
 * Components - Selects - Group - GroupSelect
 */
// UI
import { Label, ReactSelect } from '@drykiss/industry-ui'
import { useSelectTaxonomies } from '../hooks/useSelectTaxonomies/useSelectTaxonomies'

// Types
import { GroupSelectProps } from '@availabletowork/types'

export const TaxonomiesSelect = ({
  control,
  errors,
  label,
  name,
  register,
  filters,
  ...props
}: GroupSelectProps) => {
  const defaultOptions = {
    control,
    errors,
    register
  }

  const { options } = useSelectTaxonomies(filters)

  return options.length === 0 ? (
    <></>
  ) : (
    <Label id={name} label={label}>
      <ReactSelect
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
