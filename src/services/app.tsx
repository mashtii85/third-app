/**
 * Services - App
 */

// React
import { createContext, FC } from 'react'

// UI
import { LdsSpinner, PageLoading } from '@drykiss/industry-ui'

export const AppContext = createContext({})

interface AppProps {
  children: JSX.Element | JSX.Element[]
}

export const AppProvider: FC<AppProps> = ({ children }) => {
  // Todo: Fetch settings from API
  const settings = {}

  return !settings ? (
    <PageLoading indicator={<LdsSpinner />} />
  ) : (
    <AppContext.Provider value={settings || {}}>{children}</AppContext.Provider>
  )
}
