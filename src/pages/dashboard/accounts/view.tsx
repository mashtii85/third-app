/**
 * Dashboard - Account - View
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import View from '../../../components/accounts/list/tabs'

const PageAccountsView: NextPage = () => {
  return <Dashboard View={<View />} />
}

export default PageAccountsView
