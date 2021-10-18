/**
 * Components - Accounts - Lists - AccountUsers - List
 */

// UI
import { LayoutList } from '../../../../layouts/list'
import { AccountUsersFilters as Filters } from './filter'
import { AccountUsersTable as Table } from './table/table'

export const AccountUsersList = ({ accountId }: { accountId: number }) => {
  const initialFilters = {
    accountId
  }

  return <LayoutList FiltersComp={Filters} initialFilters={initialFilters} TableComp={Table} />
}
