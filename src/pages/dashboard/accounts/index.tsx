/**
 * Dashboard - Account - View
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import AccountList from '../../../components/accounts/list/account'

// Types
import { ACCOUNT_TYPE } from '../../../types/account.d'

const PageAccountsView: NextPage = () => {
  return <Dashboard View={<AccountList title="Accounts" type={ACCOUNT_TYPE.Client} />} />
}

export default PageAccountsView
