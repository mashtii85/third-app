/**
 * Types - Navigation
 */

export interface NavLink {
  id: string
  name?: string
  to?: string
  type?: any
}

export interface Navigation {
  left?: NavLink[]
  right?: NavLink[]
}
