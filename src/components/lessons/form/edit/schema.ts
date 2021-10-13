/**
 * Components - Lessons - Edit - Schema
 */

// Yup
import { number, object, string, SchemaOf } from 'yup'
import { LessonFormType } from './types.d'

export const lessonSchema: SchemaOf<LessonFormType> = object().shape({
  id: number().required(),
  content: string().required()
})
