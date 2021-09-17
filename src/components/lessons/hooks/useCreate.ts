/**
 * Components - Lessons - List - Table - Hooks - useLessonQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_LESSON, GET_LESSONS } from '../queries/queries'

import { prepareArguments } from './helpers'

// Types
import { UseCreateLessonProps } from './types.d'

export const useCreateLesson = (props: UseCreateLessonProps) => {
  const [createLesson, { loading }] = useMutation(CREATE_LESSON, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const lessonFromResponse = data?.lesson
      const where = prepareArguments({ filters: props.filters })

      const { lessons } = cache.readQuery({
        query: GET_LESSONS,
        variables: { where }
      }) || { lessons: [] }

      cache.writeQuery({
        query: GET_LESSONS,
        variables: { where },
        data: { lessons: [...lessons, lessonFromResponse] }
      })
    }
  })

  return { createLesson, loading }
}
