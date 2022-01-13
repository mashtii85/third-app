/**
 * Components - Locations - List - Filter
 */

// UI

import { Column, Label, Select } from '@drykiss/industry-ui'
import { statusActive } from '../../../constants/status'
import { Control, FieldErrors } from 'react-hook-form'
import { CustomSelect } from '../../selects/select'

// Types
import { LooseObject } from '../../../types/object.d'
import { TAXONOMY_TYPE } from '../../../types/taxonomy.d'
import { ENTITIES } from '../../../constants/entities'

export const LocationFilters = ({
  control,
  errors,
  register
}: {
  control: Control
  errors: FieldErrors
  register: any
  watch: any
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
          taxonomyType={TAXONOMY_TYPE.Location}
        />
      </Column>
    </>
  )
}
