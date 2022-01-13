/**
 * Components - Lessons - Edit - Schema
 */

// Yup
import { number, object, string, mixed, SchemaOf } from 'yup'

// Types
import { LESSON_TYPE } from '../../../../types/lesson.d'
import { LessonFormType } from './types.d'

export const lessonSchema: SchemaOf<LessonFormType> = object().shape({
  id: number().required(),
  type: mixed().oneOf(Object.values(LESSON_TYPE)),
  content: string().required()
})
