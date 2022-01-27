/**
 * Components - Courses - List - Table - Types
 */

//Types
import { CourseFilter } from '.'
import { STATUS_ACTIVE } from '../general'
import { Taxonomy } from '../taxonomies'

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

interface CourseTableProps {
  filters: CourseFilter
}
