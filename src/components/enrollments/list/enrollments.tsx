/**
 * Components - Enrollments - List - Enrollments
 */

import { EnrolledUsersFilters as Filters } from './filters'
import { EnrolledUsersTable as Table } from './table/table'
import { LayoutList } from '../../../layouts/list'

export const Enrollments = ({ courseId }: { courseId?: number }) => {
  return <LayoutList FiltersComp={Filters} TableComp={Table} otherProps={{ courseId }} />
}
