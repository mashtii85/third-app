/**
 * Components - Selects - Group - GroupSelect
 */
// UI
import { FormLabel, ReactSelectField } from '@drykiss/industry-ui'
import { STATUS_ACTIVE } from '../../../types/select.d'
import { useSelectGroups } from '../../groups/hooks/useSelectGroups/useSelectGroups'
import { GroupSelectProps } from './types'

export const GroupSelect = ({
  control,
  errors,
  label,
  name,
  register,
  filters = { status: STATUS_ACTIVE.Active },
  ...props
}: GroupSelectProps) => {
  const defaultOptions = {
    control,
    errors,
    register
  }

  const { options } = useSelectGroups(filters)

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
