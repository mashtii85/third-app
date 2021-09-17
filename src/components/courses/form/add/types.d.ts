/**
 * Components - Courses - Form - Add - types.d
 */

import { STATUS_ACTIVE } from '../../../../types/select.d'

export interface CourseFormType {
  id: number
  title: string
  description: string
  status: STATUS_ACTIVE
}
