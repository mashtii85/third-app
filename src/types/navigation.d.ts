/**
 * Types - Navigation
 */

export interface NavLink {
  divider?: boolean
  icon?: string
  id: string
  name?: string
  prefix?: string
  to?: string
  type?: any
}

export interface Navigation {
  left?: NavLink[]
  right?: NavLink[]
}
