/**
 * Dashboard - Account
 *
 *  Displays account tabs for the currently logged in user
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import View from '../../../src/components/accounts/view/tabs'
import { useCurrentUser } from '../../../src/utils/useCurrentUser'

const PageAccount: NextPage = () => {
  const { user } = useCurrentUser()

  return <Dashboard View={<View accountId={user.account_id} />} />
}

export default PageAccount
