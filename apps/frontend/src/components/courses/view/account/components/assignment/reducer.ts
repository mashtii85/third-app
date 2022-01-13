/**
 * Components - Cources - View - Account - Components - Assignment - Reducer
 */

// Types
import { AssignmentState, AssignmentActionTypes } from './types.d'

export const reducer = (state: AssignmentState, action: AssignmentActionTypes): AssignmentState => {
  const newState = { ...state }

  switch (action.type) {
    case 'upload': {
      newState.fileCaption = action.payload
      return { ...newState }
    }

    case 'reset': {
      return action.payload
    }

    case 'finish': {
      newState.isFinished = true
      return { ...newState }
    }

    default:
      throw new Error('Unknown action!')
  }
}
