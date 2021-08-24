/**
 * Types - Module
 */

import { Lesson } from './lesson'

export interface Module {
  id: number
  title: string
  description: string
  ordering?: number
  lessons?: Lesson[]
}
