/**
 * Components - Courses - Form - Add - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { FormField, Form, FormLabel, SelectField, TextareaField } from '@drykiss/industry-ui'

import { TaxonomySelect } from '../../../accounts/form/select'
import { CustomFieldElement } from './customFieldElement'
import { CourseSchema as schema } from './schema'

// Constants
import { statusActive } from '../../../../constants/status'

// Types
import { CourseFormType, CourseFormSubmission, CourseFormProps } from './types.d'
import { Options } from '../../../../types/taxonomy'

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
    control: control,
    errors: errors,
    register: register
  }

  const onSubmit = async ({ taxonomy, ...form }: CourseFormSubmission) => {
    const formParams = { ...form, taxonomy_id: taxonomy?.value }
    if (defaultValues?.id) {
      await updateCourse({ variables: { courseId: defaultValues.id, set: formParams } })
    } else {
      await createCourse({
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
      <TaxonomySelect {...defaultOptions} label="Course Type" name="taxonomy" type="courses" />
      {taxonomyWatch?.value && (
        <CustomFieldElement {...defaultValues} {...defaultOptions} taxonomyWatch={taxonomyWatch} />
      )}
    </Form>
  )
}
