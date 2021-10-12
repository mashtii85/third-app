/**
 * Services - App
 */

// React
import { createContext, useContext, useEffect } from 'react'

// GQL
import { useLazyQuery } from '@apollo/client'
import { APP_SETTINGS } from './queries'
import { ThemeContext } from 'styled-components'

// Utils
import merge from 'deepmerge'

// UI
import { ConfigContext } from '@drykiss/industry-ui'
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
  const { config, setConfig } = useContext(ConfigContext)
  const { setTheme, ...theme } = useContext(ThemeContext)

  const [getSettings, { data: { appSettings } = { appSettings: null } }] =
    useLazyQuery(APP_SETTINGS)

  // Fetch app settings when logged in user changes
  useEffect(() => {
    getSettings({
      variables: {
        client_id: user?.client_id || 0
      }
    })
  }, [user?.client_id])

  // Update theme and config when settings change
  useEffect(() => {
    if (appSettings) {
      setConfig(merge(config, appSettings.config))
      setTheme(merge(theme, appSettings.theme))
    }
  }, [appSettings])

  if (!appSettings) {
    return <Loading />
  }

  // Check maintenance mode
  if (appSettings.settings.find(({ id }) => id === 'maintenanceMode')?.value?.enabled) {
    return <ErrorPage statusCode={503} />
  }

  return <AppContext.Provider value={appSettings}>{children}</AppContext.Provider>
}
