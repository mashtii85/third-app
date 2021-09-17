/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { LooseObject } from '../../../types/object'
import { CREATE_COURSE, GET_COURSES } from '../queries'

import { prepareCoursesArguments } from './helpers'

// Types
import { UseCreateCourseProps, UseCreateCourseOutput } from './types.d'

export const useCreateCourse = (props: UseCreateCourseProps): UseCreateCourseOutput => {
  const [createCourse, { error, loading }] = useMutation(CREATE_COURSE, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const courseFromResponse = data?.course
      const variables: LooseObject = prepareCoursesArguments({
        filters: props.filters,
        clientId: props.clientId
      })

      variables.client_id = { _eq: props.clientId }
      const { courses } = cache.readQuery({
        query: GET_COURSES,
        variables
      }) || { courses: [] }

      cache.writeQuery({
        query: GET_COURSES,
        variables,
        data: { courses: [...courses, courseFromResponse] }
      })
    }
  })

  return { error, createCourse, loading }
}
