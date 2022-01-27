/**
 * Utils - Use Current User
 */

// React
import { useContext } from 'react'

// UI
import { UserContext } from '@drykiss/industry-ui'

// Types
import { CurrentUser } from '@availabletowork/types'

interface CurrentUserData {
  signIn: () => void
  signOut: () => void
  user: CurrentUser
}

export const useCurrentUser = (): CurrentUserData => {
  const currentUser: CurrentUserData = useContext(UserContext)

  if (!currentUser) {
    throw new Error('useCurrentUser must be used within the UserProvider')
  }

  return currentUser
}
