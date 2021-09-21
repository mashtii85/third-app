/**
 * Components - Lessons - Form - Schema
 */

// Yup
import { mixed, object, string, SchemaOf, number } from 'yup'
import { LESSON_TYPE, LESSON_STATUS } from '../../../../types/lesson.d'
import { LessonFormType } from './types'

export const lessonSchema: SchemaOf<LessonFormType> = object().shape({
  id: number().notRequired(),
  title: string().required(),
  description: string().notRequired(),
  type: mixed().oneOf(Object.values(LESSON_TYPE)),
  content: string().required(),
  status: mixed().oneOf(Object.values(LESSON_STATUS))
})
