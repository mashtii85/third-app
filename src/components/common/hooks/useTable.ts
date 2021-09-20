/**
 * Components - Common - Hooks - useTable
 */

// React
import { useRef } from 'react'

// Config
import { generalConfig } from '../../../config/config'
import { IsJsonString } from '../../../utils/isJson'
import { OrderBy } from '../../../types/orderBy'
import { UseTableProps, UseTableOutput } from './types.d'

export const useTable = <T>({ filters, initialSort }: UseTableProps<T>): UseTableOutput<T> => {
  const ref = useRef<any>()

  const defaultSort: OrderBy = {
    created_at: 'desc'
  }

  const sort = initialSort || defaultSort
  const orderBy = ref.current
    ? {
      [ref.current?.sort.item || sort.item]: sort.inneritem
        ? { [sort.inneritem]: ref.current?.sort.order || sort.order }
        : ref.current?.sort.order || sort.order
    }
    : defaultSort

  const initialData: T = {
    ...filters,
    limit: parseInt(ref.current?.pageSize, 10) || generalConfig.paginationSize,
    offset:
      (ref.current?.currentPage - 1 || 0) * (ref.current?.pageSize || generalConfig.paginationSize),
    orderBy:
      IsJsonString(ref.current?.sort?.item?.replace(/ORDER/i, ref.current?.sort.order)) || orderBy
  }

  return { initialData, initialSort, ref }
}
