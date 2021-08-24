/**
 * Utils - Use Current User
 */

// React
import { useContext } from 'react'

// UI
import { UserContext } from '@drykiss/industry-ui'

// Types
import { User } from '../types/user'

interface CurrentUser {
  signIn: () => void,
  signOut: () => void,
  user: User
}

export const useCurrentUser = () => {
  const currentUser: CurrentUser = useContext(UserContext)

  if (!currentUser) {
    throw new Error('useCurrentUser must be used within the UserProvider')
  }

  return currentUser
}
