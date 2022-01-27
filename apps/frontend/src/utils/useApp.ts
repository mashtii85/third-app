/**
 * Utils - Use App
 */

// React
import { useContext } from 'react'

// UI
import { AppContext } from '../services/app'
import { AppContextType } from '@availabletowork/types'

export const useApp = (): Partial<AppContextType> => {
  const app = useContext(AppContext)

  if (!app) {
    throw new Error('useApp must be used within the AppProvider')
  }

  return app
}
