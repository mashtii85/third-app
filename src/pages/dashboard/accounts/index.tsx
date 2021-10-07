/**
 * Dashboard - Account - View
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import AccountList from '../../../components/accounts/list/account'

const PageAccountsView: NextPage = () => {
  return <Dashboard View={<AccountList title="Accounts" />} />
}

export default PageAccountsView
