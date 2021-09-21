/**
 * Components - Accounts - Settings - Client
 */

// React
import { useMemo } from 'react'

// Next
import { useRouter } from 'next/router'

// UI
import { Tabs } from '@drykiss/industry-ui'
import { Tab } from '../../../common/tab'
import { ClientTheme } from './theme'
import { ClientAddress } from './address'

const ClientSettings = () => {
  const { query } = useRouter()

  const tab = useMemo(() => {
    return query.tab || 'theme'
  }, [query.tab])

  return (
    <Tabs key={tab}>
      <Tab active={tab === 'theme'} label="Theme">
        <ClientTheme />
      </Tab>
      <Tab active={tab === 'address'} label="Address">
        <ClientAddress />
      </Tab>
    </Tabs>
  )
}

export default ClientSettings
