/**
 * Components - Lessons - Edit - Schema
 */

// Yup
import { number, object, string, mixed, SchemaOf } from 'yup'

// Types
import { UpdateLessonFormType, LESSON_TYPE } from '@availabletowork/types'

export const lessonSchema: SchemaOf<UpdateLessonFormType> = object().shape({
  id: number().required(),
  type: mixed().oneOf(Object.values(LESSON_TYPE)),
  content: string().required()
})
