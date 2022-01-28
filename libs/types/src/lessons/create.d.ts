/**
 * Components - Lessons - Form - types.d
 */

//Types
import { LESSON_STATUS, LESSON_TYPE } from '@availabletowork/constants'

export interface LessonFormType {
  id: number
  title: string
  description: string
  type: LESSON_TYPE
  ordering: number
  status: LESSON_STATUS
}

export type LessonUpsertFormFilterType = {
  id: number
  courseId: number
  moduleId: number
}

export interface LESSON_TYPE_DROPDOWN {
  text: 'Text' | 'Video' | 'Quiz' | 'Assignment' | 'Pdf' | 'PowerPoint'
  value: 'text' | 'video' | 'quiz' | 'assignment' | 'pdf' | 'powerpoint'
}

export interface LESSON_STATUS_DROPDOWN {
  text: 'Active' | 'Inactive'
  value: 'active' | 'inactive'
}
