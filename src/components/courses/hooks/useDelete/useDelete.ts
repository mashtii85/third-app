/**
 * Components - Courses - Hooks - useDeleteCourse - useDeleteCourse
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_COURSE, GET_COURSES } from '../../queries'

// Helpers
import { prepareCoursesArguments } from '../helpers'

// Types
import {
  CourseDeleteData,
  CourseDeleteVariables,
  useDeleteCourseProps,
  useDeleteCourseOutput
} from './types.d'
import { Course } from '../../../../types/course.d'
import { LooseObject } from '../../../../types/object.d'

export const useDeleteCourse = (props: useDeleteCourseProps): useDeleteCourseOutput => {
  const [deleteCourse, { loading }] = useMutation<CourseDeleteData, CourseDeleteVariables>(
    DELETE_COURSE,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables: LooseObject = prepareCoursesArguments({
          filters: props.filters,
          accountId: props.clientId
        })

        variables.client_id = { _eq: props.clientId }
        const { courses } = cache.readQuery<{ courses: Course[] }>({
          query: GET_COURSES,
          variables
        }) || { courses: [] }

        const courseList = courses.filter((course) => course.id !== data?.course.id)
        cache.writeQuery({
          query: GET_COURSES,
          variables,
          data: { courses: courseList }
        })
      }
    }
  )
  return { deleteCourse, loading }
}
