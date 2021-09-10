/**
 * Navigation
 */

// UI
import { Navbar } from '@drykiss/industry-ui'
import { Default } from './data/default'
import { Admin } from './data/admin'
import { Client } from './data/client'
import { Account } from './data/account'
import { Config } from '../config'
import { UserDropdown } from './data/userDropdown'
import { useCurrentUser } from '../../utils/useCurrentUser'

export const Navigation = () => {
  const { user } = useCurrentUser()

  let links = Default

  if (user) {
    switch (user.account_type) {
      case 'admin':
        links = Admin
        break
      case 'client':
        links = Client
        break
      case 'account':
        links = Account
        break
    }
  }

  // Update user dropdown and notifications
  links.right = links.right?.map((link) => {
    if (link.id === 'navUserDropdown') {
      link = UserDropdown(user)
    }

    return link
  })

  return <Navbar brand={Config.Brand.logo} widgets={links} />
}
