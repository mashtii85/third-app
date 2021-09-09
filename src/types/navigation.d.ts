/**
 * Types - Navigation
 */

export interface NavLink {
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
