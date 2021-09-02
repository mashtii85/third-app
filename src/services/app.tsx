/**
 * Services - App
 */

// React
import { createContext } from 'react'

// UI
import { LdsSpinner, PageLoading } from '@drykiss/industry-ui'

export const AppContext = createContext({})

interface AppProps {
  children: JSX.Element | JSX.Element[]
}

export const AppProvider = ({ children }: AppProps) => {
  // Todo: Fetch settings from API
  const settings = {}

  return !settings ? (
    <PageLoading indicator={<LdsSpinner />} />
  ) : (
    <AppContext.Provider value={settings || {}}>{children}</AppContext.Provider>
  )
}
