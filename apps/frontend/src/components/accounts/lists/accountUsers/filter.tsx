/**
 * Components - Accounts - Lists - AccountUsers - Filter
 */

// UI

import { Column, Label, Select } from '@drykiss/industry-ui'
import { Control, FieldErrors } from 'react-hook-form'
import { CustomSelect } from '../../../selects/select'

// Constants
import { ENTITIES, statusActive, TAXONOMY_TYPE } from '@availabletowork/constants'

// Types
import { LooseObject } from '@availabletowork/types'

export const AccountUsersFilters = ({
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
      <Column sm={4} lg={4}>
        <Label label="Status">
          <Select {...defaultOptions} name="status" options={statusActive} />
        </Label>
      </Column>
      <Column sm={4} lg={4}>
        <CustomSelect
          {...defaultOptions}
          label="Type"
          name="taxonomy"
          entity={ENTITIES.Taxonomy}
          taxonomyType={TAXONOMY_TYPE.Member}
        />
      </Column>
    </>
  )
}
