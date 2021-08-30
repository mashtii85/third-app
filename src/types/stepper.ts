/**
 * Types - Lesson
 */

export interface IStepperActions {
  id: number
  active: boolean
  content: string
  context: string
  handleClick: () => void
  type: string
}

export interface IStepper {
  id: number
  label: string
  date?: string | null
  status: string
  actions?: IStepperActions[]
}
