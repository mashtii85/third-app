/**
 * Components - Locations - Forms - Upsert - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LocationSchema as schema } from './schema'

// UI
import { Input, Form, Label, Select } from '@drykiss/industry-ui'
import { CustomSelect } from '../../../selects/select'
import { CustomFieldElement } from '../../../taxonomies/customField/customFieldElement'

// Constants
import { statusActive } from '../../../../constants/status'
import { ENTITIES } from '../../../../constants/entities'

// Types
import { LocationFormType, LocationFormProps, LocationFormSubmission } from './types'
import { TAXONOMY_TYPE } from '../../../../types/taxonomy.d'
import { Options } from '../../../../types/options'

// Hooks
import { useCreateLocation, useUpdateLocation } from '../../hooks'

export const UpsertLocation = ({ onSuccess, defaultValues = {}, filters }: LocationFormProps) => {
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register,
    watch
  } = useForm<LocationFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  // Watchers
  const taxonomyWatch: Options = watch('taxonomy')

  const { createLocation } = useCreateLocation({
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateLocation } = useUpdateLocation({
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = {
    control,
    errors,
    register,
    showError: true
  }

  const onSubmit = ({ taxonomy, ...form }: LocationFormSubmission) => {
    if (defaultValues?.id) {
      updateLocation({
        variables: {
          locationId: defaultValues.id,
          set: { ...form, taxonomy_id: taxonomy?.value }
        }
      })
    } else {
      createLocation({
        variables: {
          object: { ...form, account_id: filters.accountId, taxonomy_id: taxonomyWatch?.value }
        }
      })
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <Label label="Name">
        <Input {...defaultOptions} name="name" />
      </Label>
      <Label label="Status">
        <Select {...defaultOptions} name="status" options={statusActive} />
      </Label>
      <CustomSelect
        {...defaultOptions}
        label="Location Type"
        name="taxonomy"
        entity={ENTITIES.Taxonomy}
        taxonomyType={TAXONOMY_TYPE.Location}
      />

      {taxonomyWatch?.value && (
        <CustomFieldElement {...defaultValues} {...defaultOptions} taxonomyWatch={taxonomyWatch} />
      )}
    </Form>
  )
}
