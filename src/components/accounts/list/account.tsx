/**
 * Components - Accounts - List - Account
 */

// UI
import { LayoutList } from '../../../layouts/list'
import { AccountTable as Table } from './table/table'
import { AccountTableProps } from './table/types'

const AccountList = (props: AccountTableProps) => {
  const initialFilters = {
    q: null,
    status: null,
    type: props.type || ''
  }

  return <LayoutList initialFilters={initialFilters} TableComp={Table} otherProps={props} />
}

export default AccountList
