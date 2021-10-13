/**
 * Components - Lessons - Form - types.d
 */

import { LESSON_TYPE, LESSON_STATUS } from '../../../../types/lesson'

export interface LessonFormType {
  id: number | undefined
  title: string
  description: string | undefined
  type: LESSON_TYPE
  status: LESSON_STATUS
}

export interface LESSON_TYPE_DROPDOWN {
  text: 'Text' | 'Video' | 'Quiz' | 'Assignment' | 'Pdf' | 'PowerPoint'
  value: 'text' | 'video' | 'quiz' | 'assignment' | 'pdf' | 'powerpoint'
}

export interface LESSON_STATUS_DROPDOWN {
  text: 'Active' | 'Inactive'
  value: 'active' | 'inactive'
}
