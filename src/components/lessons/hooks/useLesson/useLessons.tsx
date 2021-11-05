/**
 * Components - Lessons - Hooks - useLessons
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_LESSONS } from '../../queries/queries'
import { prepareArguments } from '../helpers'

// Types
import { LessonsData, LessonsVariables, LessonFilter } from './types.d'

export const useLessons = (filters: Partial<LessonFilter>) => {
  const where = prepareArguments({ filters })
  const { data, error, loading } = useQuery<LessonsData, LessonsVariables>(GET_LESSONS, {
    variables: {
      where,
      order_by: { ordering: 'asc' }
    }
  })

  if (error) {
    return { loading: false, error, lessonList: [] }
  }

  return { loading, lessonList: data?.lessons || [] }
}
