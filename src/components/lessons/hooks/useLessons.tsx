/**
 * Components - Lessons - Hooks - useLessons
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_LESSONS } from '../queries/queries'
import { LessonsData, LessonsVariables, UseLessonsProps } from './types'
import { prepareArguments } from './helpers'

export const useLessons = (filters: UseLessonsProps) => {
  const where = prepareArguments({ filters })
  const { data, error, loading } = useQuery<LessonsData, LessonsVariables>(GET_LESSONS, {
    variables: {
      where
    }
  })

  if (error) {
    return { loading: false, error, lessonList: [] }
  }

  return { loading, lessonList: data?.lessons || [] }
}
