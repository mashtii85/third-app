/**
 * Components - Accounts - Lists - Accounts - List
 */

// UI
import { LayoutList } from '../../../../layouts/list'
import { AccountsFilters as Filters } from './filter'
import { AccountTable as Table } from './table/table'
import { useCurrentUser } from '../../../../utils/useCurrentUser'

//Types
import { ACCOUNT_TYPE } from '@availabletowork/constants'

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
