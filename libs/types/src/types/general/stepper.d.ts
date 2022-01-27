/**
 * Types - Stepper
 */

//Types
import { LESSON_PROGRESS_STATUS, LESSON_TYPE } from '../lessons'
import { ThemeContext } from '../theme/types'

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
  info?: string
  date?: string | null
  labelIcon?: LESSON_TYPE
  status?: LESSON_PROGRESS_STATUS
  actions?: StepperActionModel[]
  highlighted?: boolean
}
