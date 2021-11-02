import { ReactNode, MouseEvent } from 'react'
import { ThemeContext } from '../config/types.d'

type FormatterData<T> = {
  context: ThemeContext
  icon: string[]
  numberOverlay?: string
  onClick?: (e: MouseEvent<HTMLElement>, data: T) => void
  tooltip: string
  disabled?: boolean
  // For each table it may have different data
  row?: any
}

export interface Column<T> {
  hidden?: boolean
  formatter?: ({ row }: { row: T }) => ReactNode
  formatterData?: FormatterData<T>[]
  text?: string
}
