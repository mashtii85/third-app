import { ReactNode } from 'react'

type CanvasContent = {
  content: ReactNode
  title: string
}

export interface offCanvasType {
  close: () => void
  show: (arg: CanvasContent) => void
}
