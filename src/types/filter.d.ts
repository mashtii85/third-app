/**
 * Types - Course
 */

import { OrderBy } from './orderBy'

export interface Filter {
  q?: string
  limit?: number
  offset?: number
  orderBy?: OrderBy
}
