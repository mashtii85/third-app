// Constants
import { LESSON_TYPE } from '@availabletowork/constants'

export interface UpdateLessonFormType {
  id: number
  type: LESSON_TYPE
  content: string
}
