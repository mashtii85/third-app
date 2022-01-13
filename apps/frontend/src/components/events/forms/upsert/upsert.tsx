/**
 * Components - Events - Forms - Upsert - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { EventSchema as schema } from './schema'

// UI
import { DatePicker, Input, Form, Label, Select, Textarea } from '@drykiss/industry-ui'

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
import { CustomSelect } from '../../../selects/select'
import { ENTITIES } from '../../../../constants/entities'

export const UpsertEvent = ({ onSuccess, defaultValues, filters }: EventFormProps) => {
  const { user } = useCurrentUser()

  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register,
    watch
  } = useForm<EventFormType>({
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
    register,
    showError: true
  }

  const onSubmit = ({ taxonomy, start_at, end_at, ...form }: EventFormSubmission) => {
    const formParam: LooseObject = { ...form, taxonomy_id: taxonomy?.value }
    formParam.start_at = start_at && moment(start_at).utc().format()
    formParam.end_at = end_at && moment(end_at).utc().format()
    if (defaultValues?.id) {
      delete formParam.type
      updateEvent({
        variables: {
          eventId: defaultValues.id,
          set: formParam
        }
      })
    } else {
      const object = {
        ...formParam,
        account_id: user.account_id,
        taxonomy_id: taxonomyWatch?.value
      }
      createEvent({
        variables: {
          object
        }
      })
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <Label label="Title">
        <Input {...defaultOptions} name="title" />
      </Label>

      <Label label="Description">
        <Textarea {...defaultOptions} name="description" rows={3} />
      </Label>

      <Label label="Start Date">
        <DatePicker {...defaultOptions} name="start_at" />
      </Label>

      <Label label="End Date">
        <DatePicker {...defaultOptions} name="end_at" />
      </Label>

      <Label label="Status">
        <Select {...defaultOptions} name="status" options={statusActive} />
      </Label>
      <CustomSelect
        {...defaultOptions}
        label="Type"
        name="taxonomy"
        entity={ENTITIES.Taxonomy}
        taxonomyType={TAXONOMY_TYPE.Event}
      />

      {taxonomyWatch?.value && (
        <CustomFieldElement {...defaultValues} {...defaultOptions} taxonomyWatch={taxonomyWatch} />
      )}
    </Form>
  )
}
