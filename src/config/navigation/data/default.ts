/**
 * Navigation - Data - Default
 */

// Types
import { Navigation } from '../../../types/navigation.d'

import path from '../client.json'

export const Default: Navigation = {
  right: [
    {
      id: 'navHome',
      name: 'Home',
      to: path.home
    },
    {
      id: 'navSignIn',
      name: 'Log in',
      to: path.account.signIn
    }
  ]
}
