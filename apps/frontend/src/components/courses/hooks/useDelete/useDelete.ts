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
  Course,
  CourseDeleteData,
  CourseDeleteVariables,
  useDeleteCourseProps,
  useDeleteCourseOutput
} from '@availabletowork/types'

export const useDeleteCourse = (props: useDeleteCourseProps): useDeleteCourseOutput => {
  const [deleteCourse, { loading }] = useMutation<CourseDeleteData, CourseDeleteVariables>(
    DELETE_COURSE,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables = prepareCoursesArguments({
          filters: props.filters
        })

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
