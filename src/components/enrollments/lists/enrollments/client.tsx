/**
 * Components - Courses - List - ClientCourseList
 */

import { EnrollmentsFilters } from './filter'
import { EnrollmentsTable } from './table'
import { LayoutList } from '../../../../layouts/list'

export const ClientEnrollmentsList = ({ clientId }: { clientId: number }) => {
  return (
    <LayoutList
      FiltersComp={EnrollmentsFilters}
      TableComp={EnrollmentsTable}
      otherProps={{ clientId }}
    />
  )
}
