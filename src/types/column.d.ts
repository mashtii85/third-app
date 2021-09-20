import { ReactNode, MouseEvent } from 'react'

type FormatterData<T> = {
  context: string
  icon: string[]
  numberOverlay?: string
  onClick?: (e: MouseEvent<HTMLElement>, data: T) => void
  tooltip: string
}

export interface Column<T> {
  hidden?: boolean
  formatter?: ReactNode
  formatterData?: FormatterData<T>[]
  text?: string
}
