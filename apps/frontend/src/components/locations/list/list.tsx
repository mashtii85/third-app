/**
 * Components - Locations - List - ClientCourseList
 */

import { LocationFilters as Filters } from './filter'
import { LocationTable as Table } from './table'
import { LayoutList } from '../../../layouts/list'

export const LocationList = ({ accountId }: { accountId: number }) => {
  return <LayoutList FiltersComp={Filters} TableComp={Table} initialFilters={{ accountId }} />
}
