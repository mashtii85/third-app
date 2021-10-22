/**
 * Services - App
 */

// React
import { createContext, useEffect } from 'react'

// GQL
import { useLazyQuery } from '@apollo/client'
import { APP_SETTINGS } from './queries'

// Lodash
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'

// UI
import { useAppTheme, useConfig } from '@drykiss/industry-ui'
import { Loading } from '../../components/common/loading'
import ErrorPage from '../../pages/_error'

// Types
import { CurrentUser } from '../../types/user'

export const AppContext = createContext({})

interface AppProps {
  children: JSX.Element | JSX.Element[]
  user: CurrentUser
}

export const AppProvider = ({ children, user }: AppProps) => {
  const { config, setConfig } = useConfig()
  const { theme, setTheme } = useAppTheme()

  const [getSettings, { data: { appSettings } = { appSettings: null } }] = useLazyQuery(
    APP_SETTINGS,
    {
      variables: {
        client_id: user?.client_id || 0
      }
    }
  )

  // Fetch app settings when logged in user changes
  useEffect(() => {
    getSettings()
  }, [user?.client_id])

  // Update theme and config when settings change
  useEffect(() => {
    if (!isEmpty(appSettings?.config)) {
      setConfig({ ...merge(config, appSettings.config) })
    }
    if (!isEmpty(appSettings?.theme)) {
      setTheme({ ...merge(theme, appSettings.theme) })
    }
  }, [appSettings])

  if (!appSettings) {
    return <Loading />
  }

  // Check maintenance mode
  if (
    appSettings.settings.find(({ id }: { id: string }) => id === 'maintenanceMode')?.value?.enabled
  ) {
    return <ErrorPage statusCode={503} />
  }

  return (
    <AppContext.Provider value={{ ...appSettings, refetchSettings: getSettings }}>
      {children}
    </AppContext.Provider>
  )
}
