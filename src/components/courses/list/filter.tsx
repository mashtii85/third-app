/**
 * Components - Assets - List - Filter
 */

// UI

import { FormField, FormLabel, SelectField } from '@drykiss/industry-ui'
import { statusActive } from '../../../constants/status'
import { Control, FieldErrors } from 'react-hook-form'
import { LooseObject } from '../../../types/object'

export const CourseFilters = ({
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
      <FormLabel label="Description">
        <FormField {...defaultOptions} name="description" />
      </FormLabel>
      <FormLabel label="Description">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
      </FormLabel>
    </>
  )
}
