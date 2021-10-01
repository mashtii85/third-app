/**
 * Components - Courses - Form - Add - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { FormField, Form, FormLabel, SelectField, TextareaField } from '@drykiss/industry-ui'

import { TaxonomySelect } from '../../../taxonomies/select/select'
import { CustomFieldElement } from '../../../taxonomies/customField/customFieldElement'
import { CourseSchema as schema } from './schema'

// Constants
import { statusActive } from '../../../../constants/status'

// Types
import { CourseFormType, CourseFormSubmission, CourseFormProps } from './types'
import { Options, TAXONOMY_TYPE } from '../../../../types/taxonomy.d'

// Hooks
import { useCreateCourse, useUpdateCourse } from '../../hooks'
import { useCurrentUser } from '../../../../utils/useCurrentUser'

export const CourseForm = ({ onSuccess, defaultValues = {}, filters }: CourseFormProps) => {
  const { user } = useCurrentUser()

  const { control, errors, handleSubmit, register, watch } = useForm<CourseFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  // Watchers
  const taxonomyWatch: Options = watch('taxonomy')

  const { createCourse } = useCreateCourse({
    accountId: user.account_id,
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
    register
  }

  const onSubmit = ({ taxonomy, ...form }: CourseFormSubmission) => {
    const formParams = { ...form, taxonomy_id: taxonomy?.value }

    if (defaultValues?.id) {
      updateCourse({ variables: { courseId: defaultValues.id, set: formParams } })
    } else {
      createCourse({
        variables: { accountId: user.account_id, ...formParams }
      })
    }
  }
  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Title">
        <FormField {...defaultOptions} name="title" />
      </FormLabel>
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
      </FormLabel>
      <FormLabel label="Description">
        <TextareaField {...defaultOptions} name="description" rows={3} />
      </FormLabel>
      <TaxonomySelect
        {...defaultOptions}
        label="Course Type"
        name="taxonomy"
        type={TAXONOMY_TYPE.COURSE}
      />
      {taxonomyWatch?.value && (
        <CustomFieldElement
          {...defaultValues}
          {...defaultOptions}
          taxonomyWatch={taxonomyWatch}
          type={TAXONOMY_TYPE.COURSE}
        />
      )}
    </Form>
  )
}
