/**
 * Components - Courses - Form - Schema
 */

// Yup
import { mixed, object, string, SchemaOf } from 'yup'
import { EnrollmentFormType, STATUS_ACTIVE } from '@availabletowork/types'

export const courseSchema: SchemaOf<EnrollmentFormType> = object().shape({
  title: string().required(),
  description: string().required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE))
})
