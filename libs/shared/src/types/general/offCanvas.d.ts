/**
 * Types - OffCanvas
 */

import { ReactNode } from 'react'

type CanvasContent = {
  content: ReactNode
  title: string
  width?: string
  submit?: boolean
}

export interface offCanvasType {
  close: () => void
  show: (arg: CanvasContent) => void
}
