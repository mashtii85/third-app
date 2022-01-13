/**
 * Components - Enrollments - List - Filters
 */

// UI
import { Label, Select } from '@drykiss/industry-ui'
import { Control, FieldErrors } from 'react-hook-form'

import { statusActive } from '../../../constants/status'

// Types
import { LooseObject } from '../../../types/object'

export const EnrolledUsersFilters = ({
  control,
  errors,
  register
}: {
  control: Control
  errors: FieldErrors
  register: any
  setFilters: (value: LooseObject) => void
}) => {
  const defaultOptions = {
    control,
    errors,
    register
  }

  return (
    <>
      <Label label="Status">
        <Select {...defaultOptions} name="status" options={statusActive} />
      </Label>
    </>
  )
}
