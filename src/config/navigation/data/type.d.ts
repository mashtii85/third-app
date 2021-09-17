/**
 * Navigation - Data - Type.d.ts
 */

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
