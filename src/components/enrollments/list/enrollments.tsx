/**
 * Components - Enrollments - List - Enrollments
 */

import { EnrolledUsersFilters } from './filters'
import { EnrolledUsersTable } from './table/table'
import { LayoutList } from '../../../layouts/list'

export const Enrollments = ({ courseId }: { courseId?: number }) => {
  return (
    <LayoutList
      FiltersComp={EnrolledUsersFilters}
      TableComp={EnrolledUsersTable}
      otherProps={{ courseId }}
    />
  )
}
