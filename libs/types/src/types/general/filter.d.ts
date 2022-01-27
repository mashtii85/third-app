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

export interface GQLFilters extends Omit<Filter, 'q'> {
  limit: number | null
  offset: number | null
  order_by: Partial<OrderBy>
}
