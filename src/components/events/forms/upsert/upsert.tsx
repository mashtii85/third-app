/**
 * Components - Events - Forms - Upsert - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EventSchema as schema } from './schema'

// UI
import { FormField, Form, FormLabel, SelectField, TextareaField } from '@drykiss/industry-ui'
import { TaxonomySelect } from '../../../taxonomies/select/select'
import { DatePicker } from '../../../calendar/datePicker'
// Constants
import { statusActive } from '../../../../constants/status'

// Types
import { EventFormType, EventFormProps, EventFormSubmission } from './types'
import { TAXONOMY_TYPE } from '../../../../types/taxonomy.d'
// Hooks
import { useCreateEvent, useUpdateEvent } from '../../hooks'
import { useCurrentUser } from '../../../../utils/useCurrentUser'
import { CustomFieldElement } from '../../../taxonomies/customField/customFieldElement'
import { LooseObject } from '../../../../types/object'
import moment from 'moment'
import { Options } from '../../../../types/options'

export const UpsertEvent = ({ onSuccess, defaultValues = {}, filters }: EventFormProps) => {
  const { user } = useCurrentUser()
  const { control, errors, handleSubmit, register, watch } = useForm<EventFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  // Watchers
  const taxonomyWatch: Options = watch('taxonomy')

  const { createEvent } = useCreateEvent({
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateEvent } = useUpdateEvent({
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

  const onSubmit = ({ taxonomy, start_at, end_at, ...form }: EventFormSubmission) => {
    const formParam: LooseObject = { ...form, taxonomy_id: taxonomy?.value }

    formParam.start_at = start_at && moment(start_at).utc().format()
    formParam.end_at = end_at && moment(end_at).utc().format()
    if (defaultValues?.id) {
      updateEvent({
        variables: {
          eventId: defaultValues.id,
          set: formParam
        }
      })
    } else {
      createEvent({
        variables: {
          object: { ...formParam, account_id: user.account_id, taxonomy_id: taxonomyWatch?.value }
        }
      })
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Title">
        <FormField {...defaultOptions} name="title" />
      </FormLabel>

      <FormLabel label="Description">
        <TextareaField {...defaultOptions} name="description" rows={3} />
      </FormLabel>

      <FormLabel label="Start Date">
        <DatePicker {...defaultOptions} name="start_at" options={statusActive} />
      </FormLabel>

      <FormLabel label="End Date">
        <DatePicker {...defaultOptions} name="end_at" options={statusActive} />
      </FormLabel>

      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
      </FormLabel>

      <TaxonomySelect
        {...defaultOptions}
        label="Event Type"
        name="taxonomy"
        type={TAXONOMY_TYPE.Event}
      />
      {taxonomyWatch?.value && (
        <CustomFieldElement {...defaultValues} {...defaultOptions} taxonomyWatch={taxonomyWatch} />
      )}
    </Form>
  )
}
