/**
 * Components - Enrollments - Lists - EnrolledUsers - EnrolledUsers
 */

import { EnrolledUsersFilters } from './filters'
import { EnrolledUsersTable } from './table/table'
import { LayoutList } from '../../../../layouts/list'

export const EnrolledUsersList = ({ courseId }: { courseId: number }) => {
  return (
    <LayoutList
      FiltersComp={EnrolledUsersFilters}
      TableComp={EnrolledUsersTable}
      otherProps={{ courseId }}
    />
  )
}
