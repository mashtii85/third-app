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
import { UserAccounts } from '../list/table/userAccounts'
import AccountDetails from './view/accountDetails'
import { ACCOUNT_TABS } from '../../../constants/tabs'

const AccountTabs = () => {
  const { query } = useRouter()

  const tab = useMemo(() => {
    return query.tab || ACCOUNT_TABS.ACCOUNT
  }, [query.tab])

  const accountId: number = +(query?.id || '0')

  return (
    <Tabs key={tab}>
      <Tab active={tab === ACCOUNT_TABS.ACCOUNT} label="Account">
        <AccountDetails accountId={accountId} title="Account Details" />
      </Tab>
      <Tab active={tab === ACCOUNT_TABS.USERS} label="Users">
        <UserAccounts type="accounts" title="Users" accountId={accountId} />
      </Tab>
    </Tabs>
  )
}

export default AccountTabs
