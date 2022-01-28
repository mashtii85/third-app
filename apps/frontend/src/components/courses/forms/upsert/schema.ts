/**
 * Components - Courses - Form - Upsert - Schema
 */

// Yup
import { mixed, object, string } from 'yup'

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

export const CourseSchema = object().shape({
  title: string().required(),
  description: string().required(),
  status: mixed().oneOf(Object.values(STATUS_ACTIVE)),
  taxonomy: object().shape({
    label: string(),
    value: string()
  })
})
