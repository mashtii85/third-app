/**
 * Components - Lessons - Hooks - types
 */

//Constants

export { LESSON_STATUS, LESSON_TYPE } from '@availabletowork/constants'
// Types
import { Lesson } from '.'
import { LooseObject } from '../general'
import { ApolloError } from '@apollo/client'

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
  onCompleted: (data: { lesson: Lesson }) => void
  onError: (data: ApolloError) => void
}
