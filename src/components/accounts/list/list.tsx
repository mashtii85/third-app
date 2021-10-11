/**
 * Components - Accounts - List - Account
 */

// UI
import { LayoutList } from '../../../layouts/list'
import { ACCOUNT_TYPE } from '../../../types/account.d'
import { AccountsFilters as Filters } from './filter'
import { AccountTable as Table } from './table/table'
import { useCurrentUser } from '../../../utils/useCurrentUser'

// todo: if there's no more remove this
// import { AccountTableProps } from './table/types.d'

export const AccountList = () => {
  const { user } = useCurrentUser()

  const userType =
    user.account_type === ACCOUNT_TYPE.Admin ? ACCOUNT_TYPE.Client : ACCOUNT_TYPE.Member

  const initialFilters = {
    accountId: user.account_id,
    accountType: user.account_type,
    userType,
    userId: user.id,
    clientId: user.client_id
  }

  return <LayoutList FiltersComp={Filters} initialFilters={initialFilters} TableComp={Table} />
}
