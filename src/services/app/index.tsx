/**
 * Services - App
 */

// React
import { createContext } from 'react'

// UI
import { Loading } from '../../components/common/loading'
import ErrorPage from '../../pages/_error'

// Types
import { useAppSettings } from './hooks'
import { AppContextType, AppProps, SETTINGS_MODE } from './types.d'

export const AppContext = createContext<Partial<AppContextType>>({ taxonomies: [] })

export const AppProvider = ({ children, user }: AppProps) => {
  const { appSettings, getSettings } = useAppSettings(user?.client_id)

  if (!appSettings) {
    return <Loading />
  }

  // Check maintenance mode
  if (appSettings.settings.find(({ id }) => id === SETTINGS_MODE.Maintenance)?.value?.enabled) {
    return <ErrorPage statusCode={503} />
  }

  return (
    <AppContext.Provider value={{ ...appSettings, refetchSettings: getSettings }}>
      {children}
    </AppContext.Provider>
  )
}
