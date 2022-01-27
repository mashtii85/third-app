// Types
import { MEDIUM_TYPE } from '..'

export interface AssignmentState {
  acceptableTypes: MEDIUM_TYPE[]
  fileCaption: string
  isFinished: boolean
}

type AssignmentFinishAction = { type: 'finish' }
type AssignmentUploadAction = { type: 'upload'; payload: string }
type AssignmentResetAction = { type: 'reset'; payload: AssignmentState }

export type AssignmentActionTypes =
  | AssignmentResetAction
  | AssignmentUploadAction
  | AssignmentFinishAction
