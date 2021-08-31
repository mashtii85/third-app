/**
 * Types - Module
 */

import { Lesson } from './lesson.d'

export interface Module {
  id: number
  title: string
  description: string
  ordering?: number
  lessons?: Lesson[]
}
