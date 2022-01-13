/**
 * Components - Accounts - Lists - Accounts - Table - Filter
 */

// UI

import { Column, Label, Select } from '@drykiss/industry-ui'
import { Control, FieldErrors } from 'react-hook-form'
import { statusActive } from '../../../../constants/status'
// import { TaxonomySelect } from '../../../selects/taxonomies/taxonomies'

// Types
import { TAXONOMY_TYPE } from '../../../../types/taxonomy.d'
import { UsersFilter } from '../../types'
import { CustomSelect } from '../../../selects/select'
import { ENTITIES } from '../../../../constants/entities'

export const AccountsFilters = ({
  control,
  errors,
  register
}: {
  control: Control
  errors: FieldErrors
  register: any
  setFilters: (value: UsersFilter) => void
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
