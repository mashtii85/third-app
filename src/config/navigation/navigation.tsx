/**
 * Navigation
 */

// UI
import { Navbar } from '@drykiss/industry-ui'
import { Default } from './data/default'
import { Admin } from './data/admin'
import { Client } from './data/client'
import { Member } from './data/member'
import { Config } from '../config'
import { UserDropdown } from './data/userDropdown'
import { useCurrentUser } from '../../utils/useCurrentUser'
import { useApp } from '../../utils/useApp'
import { ACCOUNT_TYPE } from '../../types/account.d'

export const Navigation = () => {
  const { user } = useCurrentUser()
  const { client_taxonomies } = useApp()

  let links = Default

  if (user) {
    switch (user.account_type) {
      case ACCOUNT_TYPE.Admin:
        links = Admin(client_taxonomies)
        break
      case ACCOUNT_TYPE.Client:
        links = Client(client_taxonomies)
        break
      case ACCOUNT_TYPE.Member:
        links = Member
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

  return <Navbar contained={false} brand={Config.Brand.logo} widgets={links} />
}
