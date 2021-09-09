/**
 * Components - Courses - Form - Schema
 */

// Yup
import { mixed, object, string, SchemaOf } from 'yup'
import { STATUS_ACTIVE } from '../../../types/select.d'
import { CourseFormType } from './types.d'

export const courseSchema: SchemaOf<CourseFormType> = object().shape({
  title: string().required(),
  description: string().required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE))
})
