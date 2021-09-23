/**
 * Components - Courses - Form - Add - types.d
 */

import { STATUS_ACTIVE } from '../../../../types/select.d'
import { Options } from '../../../../types/taxonomy'

export interface CourseFormType {
  title: string
  description: string
  status: STATUS_ACTIVE
}

export interface CourseFormSubmission extends CourseFormType {
  taxonomy?: Options
}
