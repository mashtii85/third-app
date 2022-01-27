/**
 * Types - Navigation
 */

export interface NavLinkItem {
  id: string
  name: string
  to: string
}

export interface NavLinkType {
  as: string
  items: Partial<NavLinkItem>[]
}

export interface NavLink extends NavLinkItem {
  divider: boolean
  icon: string
  prefix: string
  type: Partial<NavLinkType>
}

export interface Navigation {
  left: Partial<NavLink>[]
  right: Partial<NavLink>[]
}

export interface NavItem {
  id: string
  name?: string
  to?: string
  divider?: boolean
}

export interface UserDropDownOutput {
  id: string
  name: string
  position: 'left' | 'right'
  type: {
    as: string
    items: NavItem[]
  }
}
