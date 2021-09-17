/**
 * Components - Lessons - List - Table - Hooks - helpers
 */

// Types
import { OrderBy } from '../../../types/orderBy.d'
import { Lesson, LESSON_TYPE, LESSON_STATUS } from '../../../types/lesson.d'
import { ApolloError } from '@apollo/client'
import { LooseObject } from '../../../types/object'

export interface LessonFilter {
  title?: string
  description?: string
  type: LESSON_TYPE
  content: string
  status?: LESSON_STATUS
  limit: number
  offset: number
  orderBy: OrderBy
}

export interface UseLessonsProps {
  courseId?: number
  moduleId?: number
  title?: string
  description?: string
  type?: LESSON_TYPE
  content?: string
  status?: LESSON_STATUS
  ordering?: number
  filters?: LessonFilter
}

export interface LessonsData {
  lessons: Lesson[]
}

export interface LessonsVariables {
  where: LooseObject
}

export interface LessonData {
  lesson: Lesson
}

export interface LessonVariables {
  lessonId: number
}

// useCreateLesson
export interface UseCreateLessonProps {
  clientId?: number
  courseId?: number
  moduleId?: number
  title?: string
  description?: string
  type?: LESSON_TYPE
  content?: string
  status?: LESSON_STATUS
  ordering?: number
  onCompleted: (data: { lesson: Lesson }) => void
  onError: (data: ApolloError) => void
  filters: LooseObject
}
