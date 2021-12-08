/**
 * Components - Courses - List - ClientCourseList
 */

import { CourseFilters as Filters } from './filter'
import { CourseTable as Table } from './table'
import { LayoutList } from '../../../layouts/list'

// Next
import { useRouter } from 'next/router'

export const ClientCourseList = ({ accountId }: { accountId: number }) => {
  const { query } = useRouter()
  const taxonomyId: number = +(query?.type || '-1')
  const taxonomy = taxonomyId !== -1 && { value: taxonomyId }

  return (
    <LayoutList FiltersComp={Filters} TableComp={Table} initialFilters={{ accountId, taxonomy }} />
  )
}
