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
  const [getSettings, { data }] = useLazyQuery(APP_SETTINGS)

  useEffect(() => {
    getSettings({
      variables: {
        client_id: user?.client_id || 0
      }
    })
  }, [user?.id])

  const appSettings = data?.app_settings || null

  if (!appSettings) {
    return <PageLoading indicator={<LdsSpinner />} />
  }

  // Check maintenance mode
  if (appSettings.settings.find(({ id }) => id === 'maintenanceMode')?.value?.enabled) {
    return <ErrorPage statusCode={503} />
  }

  return <AppContext.Provider value={appSettings}>{children}</AppContext.Provider>
}
