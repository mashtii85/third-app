/**
 * Dashboard - Account - Settings
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import ClientSettings from '../../../components/accounts/settings/client'

const PageSettings: NextPage = () => {
  return <Dashboard View={<ClientSettings />} />
}

export default PageSettings
