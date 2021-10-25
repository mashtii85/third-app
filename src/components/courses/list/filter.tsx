/**
 * Components - Assets - List - Filter
 */

// UI
import { Column, FormLabel, SelectField } from '@drykiss/industry-ui'
import { statusActive } from '../../../constants/status'
import { Control, FieldErrors } from 'react-hook-form'

// Types
import { LooseObject } from '../../../types/object'
import { TaxonomySelect } from '../../taxonomies/select/select'
import { TAXONOMY_TYPE } from '../../../types/taxonomy.d'
import { useQueryWatcher } from '../../common/hooks/useQueryWatcher/useQueryWatcher'

export const CourseFilters = ({
  control,
  errors,
  register,
  watch
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

  // Watchers
  useQueryWatcher({ watcher: watch('taxonomy'), queryName: 'type' })

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
          label="Type"
          name="taxonomy"
          type={TAXONOMY_TYPE.Course}
        />
      </Column>
    </>
  )
}
