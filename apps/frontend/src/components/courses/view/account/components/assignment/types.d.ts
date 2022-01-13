/**
 * Components - Cources - View - Account - Components - Assignment - Types
 */

// Types
import { MEDIUM_TYPE } from '../../../../../../types/medium.d'

export interface AssignmentState {
  acceptableTypes: MEDIUM_TYPE[]
  fileCaption: string
  isFinished: boolean
}

type FinishAction = { type: 'finish' }
type UploadAction = { type: 'upload'; payload: string }
type ResetAction = { type: 'reset'; payload: AssignmentState }

export type AssignmentActionTypes = ResetAction | UploadAction | FinishAction
