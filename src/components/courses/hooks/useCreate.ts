/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { Course } from '../../../types/course'
import { CREATE_COURSE, GET_COURSES } from '../queries'
import { prepareArguments } from './helpers'

export const useCreateCourse = (props: {
  clientId: number
  onCompleted: (data: any) => void
  filters: any
}) => {
  const [createCourse, { loading }] = useMutation(CREATE_COURSE, {
    onCompleted: (data) => {
      props.onCompleted(data)
      // onSubmit && onSubmit(data)
    },
    onError: (err) => {
      console.log(err)
      // error(err)
    },
    update(cache, { data }) {
      const courseFromResponse = data.insert_course_one
      const where = prepareArguments({ filters: props.filters, clientId: props.clientId })

      where.client_id = { _eq: props.clientId }
      const courses =
        cache.readQuery<Course[]>({
          query: GET_COURSES,
          variables: { where }
        }) || []
      console.log(courseFromResponse)
      cache.writeQuery({
        query: GET_COURSES,
        variables: where,
        data: { courses: [...courses, courseFromResponse], course: courseFromResponse }
      })
    }
  })
  return { createCourse, loading }
}
