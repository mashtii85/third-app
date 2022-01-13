/**
 * Dashboard - Account - View
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { AccountList } from '../../../src/components/accounts/lists/accounts/list'

const PageAccountsView: NextPage = () => {
  return <Dashboard View={<AccountList />} />
}

export default PageAccountsView
