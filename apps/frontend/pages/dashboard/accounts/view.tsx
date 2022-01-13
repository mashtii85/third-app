/**
 * Dashboard - Account - View
 *
 * Displays account tabs for the account ID from url
 */

// Next
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { Loading } from '../../../src/components/common/loading'
import View from '../../../src/components/accounts/view/tabs'

const PageAccountsView: NextPage = () => {
  const { query } = useRouter()

  const accountId: number = +(query?.id || '0')

  if (!accountId) {
    return <Loading />
  }

  return <Dashboard View={<View accountId={accountId} />} />
}

export default PageAccountsView
