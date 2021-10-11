/**
 * Components - Accounts - List - Table - Filter
 */

// UI

import { Column, FormLabel, SelectField } from '@drykiss/industry-ui'
import { Control, FieldErrors } from 'react-hook-form'
import { statusActive } from '../../../constants/status'
import { TaxonomySelect } from '../../taxonomies/select/select'

// Types
import { LooseObject } from '../../../types/object.d'
import { TAXONOMY_TYPE } from '../../../types/taxonomy.d'

export const AccountsFilters = ({
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
        <FormLabel label="Status">
          <SelectField {...defaultOptions} name="status" options={statusActive} />
        </FormLabel>
      </Column>
      <Column sm={4} lg={4}>
        <TaxonomySelect
          {...defaultOptions}
          label={'Type'}
          name="taxonomy"
          type={TAXONOMY_TYPE.MEMBER}
        />
      </Column>
    </>
  )
}
