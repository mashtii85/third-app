/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_COURSE, GET_COURSES } from '../queries'

import { prepareArguments } from './helpers'

// Types
import { UseCreateCourseProps } from './types.d'

export const useCreateCourse = (props: UseCreateCourseProps) => {
  const [createCourse, { loading }] = useMutation(CREATE_COURSE, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const courseFromResponse = data?.course
      const where = prepareArguments({ filters: props.filters, clientId: props.clientId })

      where.client_id = { _eq: props.clientId }
      const { courses } = cache.readQuery({
        query: GET_COURSES,
        variables: { where }
      }) || { courses: [] }

      cache.writeQuery({
        query: GET_COURSES,
        variables: { where },
        data: { courses: [...courses, courseFromResponse] }
      })
    }
  })

  return { createCourse, loading }
}
