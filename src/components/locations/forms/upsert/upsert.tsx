/**
 * Components - Locations - Forms - Upsert - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LocationSchema as schema } from './schema'

// UI
import { FormField, Form, FormLabel, SelectField } from '@drykiss/industry-ui'
import { TaxonomySelect } from '../../../taxonomies/select/select'
// import { CustomFieldElement } from './customFieldElement'
// Constants
import { statusActive } from '../../../../constants/status'

// Types
import { LocationFormType, LocationFormProps, LocationFormSubmission } from './types'
import { TAXONOMY_TYPE } from '../../../../types/taxonomy.d'
// Hooks
import { useCreateLocation, useUpdateLocation } from '../../hooks'
import { CustomFieldElement } from '../../../taxonomies/customField/customFieldElement'
import { Options } from '../../../../types/options'

export const UpsertLocation = ({ onSuccess, defaultValues = {}, filters }: LocationFormProps) => {
  const { control, errors, handleSubmit, register, watch } = useForm<LocationFormType>({
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
    register
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
      <FormLabel label="Name">
        <FormField {...defaultOptions} name="name" />
      </FormLabel>
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
      </FormLabel>
      <TaxonomySelect
        {...defaultOptions}
        label="Location Type"
        name="taxonomy"
        type={TAXONOMY_TYPE.Location}
      />
      {taxonomyWatch?.value && (
        <CustomFieldElement
          {...defaultValues}
          {...defaultOptions}
          taxonomyWatch={taxonomyWatch}
          type={TAXONOMY_TYPE.Location}
        />
      )}
    </Form>
  )
}
