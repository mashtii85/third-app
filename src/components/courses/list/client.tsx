/**
 * Components - Courses - List - ClientCourseList
 */

import { CourseFilters } from './filter'
import { CourseTable } from './table'
import { LayoutList } from '../../../layouts/list'

export const ClientCourseList = ({ clientId }: { clientId: number }) => {
  return (
    <LayoutList FiltersComp={CourseFilters} TableComp={CourseTable} otherProps={{ clientId }} />
  )
}
