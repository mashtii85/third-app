/**
 * Components - Events - List - ClientCourseList
 */

import { EventFilters } from './filter'
import { EventTable } from './table'
import { LayoutList } from '../../../layouts/list'

export const EventList = ({ accountId }: { accountId: number }) => {
  return <LayoutList FiltersComp={EventFilters} TableComp={EventTable} otherProps={{ accountId }} />
}
