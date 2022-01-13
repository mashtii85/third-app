/**
 * Components - Lessons - Hooks - types
 */

// Types
import { Lesson, LESSON_TYPE, LESSON_STATUS } from '../../../../types/lesson.d'
import { ApolloError } from '@apollo/client'
import { LooseObject } from '../../../../types/object'

export interface LessonFilter {
  id: number
  courseId: number
  moduleId: number
  title: string
  description: string
  type: LESSON_TYPE
  content: string
  status: LESSON_STATUS
  ordering: number
}

export interface UseLessonsProps {
  courseId: number
  moduleId: number
  lessons?: Lesson[]
  onChanged: () => void
}

export interface LessonsData {
  lessons: Lesson[]
}

export interface LessonsVariables {
  order_by?: LooseObject
  where?: LooseObject
}

export interface LessonData {
  lesson: Lesson
}

export interface LessonVariables {
  lessonId: number
}

export interface UseCreateLessonProps {
  lesson: Lesson
  // filters: LooseObject
  onCompleted: (data: { lesson: Lesson }) => void
  onError: (data: ApolloError) => void
}
