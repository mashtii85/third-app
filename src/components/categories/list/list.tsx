/**
 * Components - Taxonomy - List
 */

// UI
import { LayoutList } from '../../../layouts/list'
import { TaxonomyTable as Table } from './table'
import { TableProps } from './types'
const TaxonomyList = (props: TableProps) => {
  const initialFilters = {
    q: null,
    status: null,
    type: props.type || ''
  }

  return <LayoutList initialFilters={initialFilters} otherProps={props} TableComp={Table} />
}

export default TaxonomyList
