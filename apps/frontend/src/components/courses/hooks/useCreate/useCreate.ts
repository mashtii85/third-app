/**
 * Components - Courses - Hooks - useCourseQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_COURSE, GET_COURSES } from '../../queries'

// Helpers
import { prepareCoursesArguments } from '../helpers'

// Types
import {
  UseCreateCourseProps,
  UseCreateCourseOutput,
  CourseQueryData,
  CreateCourseVariables
} from './types'

export const useCreateCourse = (props: UseCreateCourseProps): UseCreateCourseOutput => {
  const [createCourse, { error, loading }] = useMutation<CreateCourseVariables>(CREATE_COURSE, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const courseFromResponse = data?.course
      const variables = prepareCoursesArguments({
        filters: props.filters
      })

      const { courses } = cache.readQuery<CourseQueryData>({
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

  return { createCourse, error, loading }
}
