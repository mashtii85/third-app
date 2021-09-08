/**
 * Navigation - Data - Default
 */

// Types
import { Navigation } from '../../../types/navigation.d'

import pages from '../../pages.json'

export const Default: Navigation = {
  right: [
    {
      id: 'navHome',
      name: 'Home',
      to: pages.home
    },
    {
      id: 'navSignIn',
      name: 'Log in',
      to: pages.account.signIn
    }
  ]
}
