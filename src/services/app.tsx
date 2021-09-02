/**
 * Services - App
 */

// React
import { createContext, useEffect, useState } from 'react'

// Apollo
import { gql, useLazyQuery } from '@apollo/client'

// UI
import { LdsSpinner, PageLoading } from '@drykiss/industry-ui'

// Types
import { User } from '../types/user'

export const AppContext = createContext({})

interface AppProps {
  children: JSX.Element | JSX.Element[]
  user: User
}

// Query
const GET_APP_SETTINGS = gql`
  query GetAppSettings {
    settings: setting {
      id
      value
    }
  }
`

export const AppProvider = ({ children, user }: AppProps) => {
  const [isLoading, setIsLoading] = useState(false)

  // Todo: Fetch settings from API
  const [getSettings, { data }] = useLazyQuery(GET_APP_SETTINGS)

  useEffect(() => {
    getSettings()
  }, [user?.id])

  if (isLoading && data?.settings?.length > 0) {
    setIsLoading(false)
  }

  return isLoading ? (
    <PageLoading indicator={<LdsSpinner />} />
  ) : (
    <AppContext.Provider value={data || {}}>{children}</AppContext.Provider>
  )
}
