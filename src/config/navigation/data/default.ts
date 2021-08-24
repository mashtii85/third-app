/**
 * Navigation - Data - Default
 */

// Types
import { Navigation } from '../../../types/navigation'

export const Default: Navigation = {
  right: [
    {
      id: 'navHome',
      name: 'Home',
      to: '/'
    },
    {
      id: 'navSignIn',
      name: 'Log in',
      to: '/account/sign-in'
    }
  ]
}
