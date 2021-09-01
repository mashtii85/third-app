/**
 * Types - Lesson
 */

import { ThemeContext } from '../config/types'
import { LessonStatus } from './lesson'

type StepperActionType = 'button'
export interface StepperActionModel {
  id: number
  active: boolean
  content: string
  context: ThemeContext
  handleClick: () => void
  type: StepperActionType
}

export interface StepperModel {
  id: number
  label: string
  date?: string | null
  status: LessonStatus
  actions?: StepperActionModel[]
}
