/**
 * Components - Events - List - ClientCourseList
 */

import { EventFilters as Filters } from './filter'
import { EventTable as Table } from './table'
import { LayoutList } from '../../../layouts/list'

export const EventList = ({ accountId }: { accountId: number }) => {
  return <LayoutList FiltersComp={Filters} TableComp={Table} initialFilters={{ accountId }} />
}
