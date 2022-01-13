/**
 * Components - Lessons - Form - Schema
 */

// Yup
import { mixed, object, string, SchemaOf, number } from 'yup'
import { LESSON_TYPE, LESSON_STATUS } from '../../../../types/lesson.d'
import { LessonFormType } from './types.d'

export const lessonSchema: SchemaOf<LessonFormType> = object()
  .shape({
    id: number(),
    title: string().required(),
    description: string(),
    type: mixed().oneOf(Object.values(LESSON_TYPE)),
    status: mixed().oneOf(Object.values(LESSON_STATUS))
  })
  .required()
