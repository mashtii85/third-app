/**
 * Components - Account - List - Tabs
 */

// React
import { useMemo } from 'react'

// Next
import { useRouter } from 'next/router'

// UI
import { Tabs, TabItem } from '@drykiss/industry-ui'
import { AccountUsersList } from '../lists/accountUsers/list'
import AccountDetails from './accountDetails'

// Types
import { ACCOUNT_TABS } from '../../../constants/tabs'
import { AccountTabsProps } from '@availabletowork/types'

const AccountTabs = ({ accountId }: AccountTabsProps) => {
  const { query } = useRouter()

  const tab = useMemo(() => {
    return query.tab || ACCOUNT_TABS.ACCOUNT
  }, [query.tab])

  return (
    <Tabs key={tab}>
      <TabItem active={tab === ACCOUNT_TABS.ACCOUNT} label="Account">
        <AccountDetails accountId={accountId} title="Account Details" />
      </TabItem>
      <TabItem active={tab === ACCOUNT_TABS.USERS} label="Users">
        <AccountUsersList accountId={accountId} />
      </TabItem>
    </Tabs>
  )
}

export default AccountTabs
