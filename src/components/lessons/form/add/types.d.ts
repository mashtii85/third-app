/**
 * Components - Lessons - Form - types.d
 */

import { LESSON_TYPE, LESSON_STATUS } from '../../../../types/lesson.d'

export interface LessonFormType {
  id: number | undefined
  title: string
  description: string | undefined
  type: LESSON_TYPE
  content: string
  status: LESSON_STATUS
}

export interface LESSON_TYPE_DROPDOWN {
  text: 'Text' | 'Video' | 'Quiz' | 'Assignment'
  value: 'text' | 'video' | 'quiz' | 'assignment'
}

export interface LESSON_STATUS_DROPDOWN {
  text: 'Active' | 'Inactive'
  value: 'active' | 'inactive'
}

export const lessonType: LESSON_TYPE_DROPDOWN[] = [
  { text: 'Text', value: 'text' },
  { text: 'Video', value: 'video' },
  { text: 'Quiz', value: 'quiz' },
  { text: 'Assignment', value: 'assignment' }
]

export const lessonStatus: LESSON_STATUS_DROPDOWN[] = [
  { text: 'Active', value: 'active' },
  { text: 'Inactive', value: 'inactive' }
]
