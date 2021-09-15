/**
 * Components - Courses - Form - Schema
 */

// Yup
import { mixed, object, string, SchemaOf } from 'yup'
import { STATUS_ACTIVE } from '../../../types/select.d'
import { EnrollmentFormType } from './types.d'

export const courseSchema: SchemaOf<EnrollmentFormType> = object().shape({
  title: string().required(),
  description: string().required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE))
})
