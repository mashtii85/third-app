/**
 * Components - Lessons - Form - Schema
 */

// Yup
import { mixed, object, string, SchemaOf } from 'yup'
import { STATUS_ACTIVE } from '../../../types/select.d'
import { LessonFormType } from './types.d'

export const lessonSchema: SchemaOf<LessonFormType> = object().shape({
  title: string().required(),
  description: string().required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE))
})
