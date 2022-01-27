/**
 * Navigation
 */

// UI
import { Navbar, useConfig } from '@drykiss/industry-ui'
import { Default } from './data/default'
import { Admin } from './data/admin'
import { Client } from './data/client'
import { Member } from './data/member'
import { UserDropdown } from './data/userDropdown'
import { useCurrentUser } from '../../utils/useCurrentUser'
import { useCurrentAccount } from '../../utils/useCurrentAccount'
import { useApp } from '../../utils/useApp'

// Types
import { ACCOUNT_TYPE } from '@availabletowork/types'

export const Navigation = () => {
  const { config } = useConfig()
  const { user } = useCurrentUser()
  const account = useCurrentAccount()
  const { taxonomies } = useApp()

  let links = Default()

  if (user) {
    switch (user.account_type) {
      case ACCOUNT_TYPE.Admin:
        links = Admin(taxonomies)
        break
      case ACCOUNT_TYPE.Client:
        links = Client({ account, taxonomies })
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
  const logo = config.Brand.logoCDN
    ? `${process.env.NEXT_PUBLIC_S3_CDN_URL}/${config.Brand.logo}`
    : config.Brand.logo
  return <Navbar contained={false} brand={logo} widgets={links} />
}
