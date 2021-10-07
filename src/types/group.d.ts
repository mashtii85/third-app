/**
 * Types - Group
 */

// Types
import { STATUS_ACTIVE } from './select.d'

export interface Group {
  id: number
  account_id: number
  taxonomy_id?: number
  name: string
  description: string
  created_at: Date
  updated_at: Date
  status: STATUS_ACTIVE
}
