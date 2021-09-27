/**
 * Components - Courses - List - Table - Types
 */

import { STATUS_ACTIVE } from '../../../../types/select'
import { Taxonomy } from '../../../../types/taxonomy'

export interface CourseTableRowsType {
  id: number | undefined
  title: string
  author: string
  enrolled: number
  actions: string
  status: STATUS_ACTIVE
  description?: string
  taxonomy: Taxonomy
  taxonomy_id?: number
  custom_fields: any // Import type later
}
