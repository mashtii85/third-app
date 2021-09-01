/**
 * Components - Courses - Form - Schema
 */

// Yup
import { array, number, object, string, SchemaOf } from 'yup'
import { Course } from '../../../types/course'

export const courseSchema: SchemaOf<Course> = object().shape({
  title: string().required(),
  description: string(),
  author: string(),
  progress: number(),
  id: number(),
  length: string(),
  media: array(),
  modules: array()
})
