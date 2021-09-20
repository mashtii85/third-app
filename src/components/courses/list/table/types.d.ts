/**
 * Components - Courses - List - Table - Types
 */

import { STATUS_ACTIVE } from '../../../../types/select'

export interface CourseTableRowsType {
  id: number | undefined
  title: string
  author: string
  enrolled: number
  actions: string
  status: STATUS_ACTIVE
  description?: string
}
