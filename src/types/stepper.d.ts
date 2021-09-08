/**
 * Types - Stepper
 */

import { ThemeContext } from '../config/types'
import { LESSON_PROGRESS_STATUS } from './lessonProgress'

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
  status: LESSON_PROGRESS_STATUS
  actions?: StepperActionModel[]
}
