/**
 * Components - Utils - Use App
 */

// React
import { useContext } from 'react'

// UI
import { AppContext } from '../../services/app'

export const useApp = () => {
  const app = useContext(AppContext)

  if (!app) {
    throw new Error('useApp must be used within the AppProvider')
  }

  return app
}
