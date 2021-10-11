/**
 * Services - App
 */

// React
import { createContext, useEffect } from 'react'

// GQL
import { useLazyQuery } from '@apollo/client'
import { APP_SETTINGS } from './queries'

// UI
import { LdsSpinner, PageLoading } from '@drykiss/industry-ui'
import ErrorPage from '../../pages/_error'

// Types
import { CurrentUser } from '../../types/user'

export const AppContext = createContext({})

interface AppProps {
  children: JSX.Element | JSX.Element[]
  user: CurrentUser
}

export const AppProvider = ({ children, user }: AppProps) => {
  const [getSettings, { data }] = useLazyQuery(APP_SETTINGS, {
    variables: {
      client_id: user?.client_id || 0
    }
  })

  useEffect(() => {
    getSettings()
  }, [user?.id])

  const settings = data?.app_settings || null

  if (!settings) {
    return <PageLoading indicator={<LdsSpinner />} />
  }

  console.log('settings', settings)

  // Check maintenance mode
  if (settings.find(({ id }) => id === 'maintenanceMode')?.value?.enabled) {
    return <ErrorPage statusCode={503} />
  }

  return <AppContext.Provider value={settings}>{children}</AppContext.Provider>
}
