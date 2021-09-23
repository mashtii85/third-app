/**
 * Components - Courses - Form - Add - Form
 */

// React
import { useContext } from 'react'

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import {
  FormField,
  Form,
  FormLabel,
  SelectField,
  TextareaField,
  UserContext
} from '@drykiss/industry-ui'
import { TaxonomySelect } from '../../../accounts/form/select'
import { CourseSchema as schema } from './schema'

// Constants
import { statusActive } from '../../../../constants/status'

// Types
import { CourseFormType, CourseFormSubmission } from './types.d'

// Hooks
import { useCreateCourse, useUpdateCourse } from '../../hooks'
import { useTaxonomies } from '../../../categories/hooks/useTaxonomies'
import { CourseFilter } from '../../hooks/types.d'
import { LooseObject } from '../../../../types/object.d'
import { Course } from '../../../../types/course'

export const CourseForm = ({
  onSuccess,
  defaultValues = {},
  filters
}: {
  onSuccess: () => void
  filters: CourseFilter
  defaultValues?: Course | LooseObject
}) => {
  const { user } = useContext(UserContext)

  const { control, errors, setValue, handleSubmit, register } = useForm<CourseFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const { taxonomies } = useTaxonomies({
    id: defaultValues?.taxonomy_id
  })
  if (taxonomies.length > 0) {
    setValue('taxonomy' as any, { value: taxonomies[0].id, label: taxonomies[0].name })
  }
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

  const onSubmit = async ({ taxonomy, ...form }: CourseFormSubmission) => {
    const formParams = { ...form, taxonomy_id: taxonomy?.value }

    if (defaultValues?.id) {
      updateCourse({ variables: { courseId: defaultValues.id, set: formParams } })
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
    </Form>
  )
}
