/**
 * Components - Common - Hooks - Types.d
 */

// Types
import { LooseObject } from '../../../types/object.d'
import { MutableRefObject } from 'react'

export interface UseTableProps<T> {
  filters: T
  initialSort: LooseObject
}

export interface UseTableOutput<T> {
  initialData: T
  initialSort: LooseObject
  ref: MutableRefObject<any>
}
