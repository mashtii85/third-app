/**
 * Components - Selects - Group - GroupSelect
 */
// UI
import { Label, ReactSelect } from '@drykiss/industry-ui'

// Constants
import { STATUS_ACTIVE } from '@availabletowork/types'

// Types
import { GroupSelectProps } from '@availabletowork/types'
// Hooks
import { useSelectGroups } from '../../groups/hooks/useSelectGroups/useSelectGroups'

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
