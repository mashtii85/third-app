/**
 * Components - Account - List - Tabs
 */

// React
import { useMemo } from 'react'

// Next
import { useRouter } from 'next/router'

// UI
import { Tabs } from '@drykiss/industry-ui'
import { Tab } from '../../common/tab'

import AccountDetails from './accountDetails'

// Types
import { ACCOUNT_TABS } from '../../../constants/tabs'
import { AccountTabsProps } from './type.d'
import { AccountUsersList } from '../lists/accountUsers/list'

const AccountTabs = ({ accountId }: AccountTabsProps) => {
  const { query } = useRouter()

  const tab = useMemo(() => {
    return query.tab || ACCOUNT_TABS.ACCOUNT
  }, [query.tab])

  return (
    <Tabs key={tab}>
      <Tab active={tab === ACCOUNT_TABS.ACCOUNT} label="Account">
        <AccountDetails accountId={accountId} title="Account Details" />
      </Tab>
      <Tab active={tab === ACCOUNT_TABS.USERS} label="Users">
        <AccountUsersList accountId={accountId} />
      </Tab>
    </Tabs>
  )
}

export default AccountTabs
