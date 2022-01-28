/**
 * Services - App
 */

// React
import { createContext } from 'react'

// UI
import { Loading } from '../../components/common/loading'
import ErrorPage from '../../pages/_error'
import { isLocale } from '../../translations/config'

// Constants
import { SETTINGS_MODE } from '@availabletowork/constants'
// Types
import { AppContextType, AppProps } from '@availabletowork/types'

// Hooks
import { useAppSettings } from './hooks'

export const AppContext = createContext<Partial<AppContextType>>({ taxonomies: [] })

export const AppProvider = ({ children, user }: AppProps) => {
  const locale = isLocale(user?.meta?.locale) && user.meta?.locale ? user.meta.locale : 'en'
  const { appSettings, getSettings } = useAppSettings(user?.client_id, locale)

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
