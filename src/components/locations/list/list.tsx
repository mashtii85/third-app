/**
 * Components - Locations - List - ClientCourseList
 */

import { LocationFilters } from './filter'
import { LocationTable } from './table'
import { LayoutList } from '../../../layouts/list'

export const LocationList = ({ accountId }: { accountId: number }) => {
  return (
    <LayoutList
      FiltersComp={LocationFilters}
      TableComp={LocationTable}
      otherProps={{ accountId }}
    />
  )
}
