/**
 * Components - Lessons - View - types.d
 */

// Constants
import { LESSON_STATUS, LESSON_TYPE } from '@availabletowork/constants'

// Types
import { Medium } from '../media'
export interface LessonDetailsToolbarType {
  id: number
  title: string
  description: string
  type: LESSON_TYPE
  status: LESSON_STATUS
}

export interface LessonViewStateHolder {
  editMode: boolean
  medium: Medium
}
