/**
 * Components - Taxonomy - List
 */

// UI
import { LayoutList } from '../../../layouts/list'
import { AccountTable as Table } from './table/table'
import { TableProps } from './table/types'

const AccountList = (props: TableProps) => {
  const initialFilters = {
    q: null,
    status: null,
    type: props.type || ''
  }

  return <LayoutList initialFilters={initialFilters} otherProps={props} TableComp={Table} />
}

export default AccountList
