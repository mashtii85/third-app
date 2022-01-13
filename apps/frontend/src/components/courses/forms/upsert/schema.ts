/**
 * Components - Courses - Form - Upsert - Schema
 */

// Yup
import { mixed, object, string } from 'yup'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export const CourseSchema = object().shape({
  title: string().required(),
  description: string().required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE)),
  taxonomy: object().shape({
    label: string(),
    value: string()
  })
})
