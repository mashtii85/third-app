/**
 * Components - Accounts - Settings - Client
 */

// React
import { useMemo } from 'react'

// Next
import { useRouter } from 'next/router'

// UI
import { Tabs, TabItem } from '@drykiss/industry-ui'
import { ThemeSettings } from './theme'
import { ClientAddress } from './address'
import { useAccount } from '../hooks/useAccount/useAccount'

// User
import { useCurrentUser } from '../../../utils/useCurrentUser'

const ClientSettings = () => {
  const { user } = useCurrentUser()
  const { query } = useRouter()

  const { account } = useAccount({ accountId: user.account_id })

  const tab = useMemo(() => {
    return query.tab || 'theme'
  }, [query.tab])

  return (
    <Tabs key={tab} gap={0}>
      <TabItem active={tab === 'theme'} label="Theme">
        <ThemeSettings account={account} />
      </TabItem>
      <TabItem active={tab === 'address'} label="Address">
        <ClientAddress />
      </TabItem>
    </Tabs>
  )
}

export default ClientSettings
