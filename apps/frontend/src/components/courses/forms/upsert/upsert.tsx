/**
 * Components - Courses - Forms - Add - UpsertForm
 */
// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { Input, Form, Label, Select, Textarea } from '@drykiss/industry-ui'
import { CustomSelect } from '../../../selects/select'
import { CustomFieldElement } from '../../../taxonomies/customField/customFieldElement'
import { CourseSchema as schema } from './schema'

// Constants
import { ENTITIES, statusActive, TAXONOMY_TYPE } from '@availabletowork/constants'

// Types
import {
  CourseFormType,
  CourseFormSubmission,
  CourseFormProps,
  Options
} from '@availabletowork/types'

// Hooks
import { useCreateCourse, useUpdateCourse } from '../../hooks'
import { useCurrentUser } from '../../../../utils/useCurrentUser'

// Helpers
import { prepareFormParams } from './helpers'

export const UpsertCourseForm = ({ onSuccess, defaultValues = {}, filters }: CourseFormProps) => {
  const { user } = useCurrentUser()
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register,
    watch
  } = useForm<CourseFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  // Watchers
  const taxonomyWatch: Options = watch('taxonomy')

  const { createCourse } = useCreateCourse({
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateCourse } = useUpdateCourse({
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

  const onSubmit = ({ taxonomy, ...form }: CourseFormSubmission) => {
    const formParams = { ...form, taxonomy_id: taxonomy?.value }
    if (defaultValues?.id) {
      const set = prepareFormParams(formParams)

      updateCourse({ variables: { courseId: defaultValues.id, set } })
    } else {
      createCourse({
        variables: { accountId: user.account_id, ...formParams }
      })
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <Label label="Title">
        <Input {...defaultOptions} name="title" />
      </Label>
      <Label label="Status">
        <Select {...defaultOptions} name="status" options={statusActive} />
      </Label>
      <Label label="Description">
        <Textarea {...defaultOptions} name="description" rows={3} />
      </Label>

      <CustomSelect
        {...defaultOptions}
        label="Course Type"
        name="taxonomy"
        entity={ENTITIES.Taxonomy}
        taxonomyType={TAXONOMY_TYPE.Course}
      />

      {taxonomyWatch && (
        <CustomFieldElement {...defaultValues} {...defaultOptions} taxonomyWatch={taxonomyWatch} />
      )}
    </Form>
  )
}
