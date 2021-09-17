/**
 * Components - Courses - Form - Add - Schema
 */

// Yup
import { mixed, number, object, string, SchemaOf } from 'yup'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { CourseFormType } from './types.d'

export const courseSchema: SchemaOf<CourseFormType> = object().shape({
  id: number(),
  title: string().required(),
  description: string().required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE))
})
