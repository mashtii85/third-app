/**
 * Types - Course
 */

import { OrderBy } from './orderBy'

export interface Filter {
  q: string
  limit: number
  offset: number
  orderBy: OrderBy
}

export interface DBFilters extends Omit<Filter, 'q'> {
  limit?: number
  offset?: number
  order_by?: OrderBy
}
