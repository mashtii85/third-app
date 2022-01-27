/**
 * Components - Lessons - Hooks - useLessons
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_LESSONS } from '../../queries/queries'

// Helpers
import { prepareArguments } from '../helpers'

// Types
import { GQLClause, Lesson, LessonsData, LessonFilter } from '@availabletowork/types'

export const useLessons = (filters: Partial<LessonFilter>) => {
  const variables = prepareArguments({ filters })
  const { data, error, loading, refetch } = useQuery<LessonsData, GQLClause<Lesson>>(GET_LESSONS, {
    variables
  })

  if (error) {
    return { loading: false, error, lessonList: [] }
  }

  return { loading, lessonList: data?.lessons || [], refetch }
}
