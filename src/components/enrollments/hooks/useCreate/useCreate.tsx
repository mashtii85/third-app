/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { GraphqlWhere } from '../../../../types/gql.d'
import { GET_ENROLLMENTS, INSERT_ENROLLMENT } from '../../queries'

import { CourseEnrolment } from '../../../../types/course.d'

// Types
import { UseCreateEnrollmentProps } from './types'

export const useCreateEnrollment = (props: UseCreateEnrollmentProps) => {
  const [createEnrollment, { loading }] = useMutation(INSERT_ENROLLMENT, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const courseFromResponse = data?.course
      const where: GraphqlWhere<CourseEnrolment> = {
        client_id: { _eq: props.userId }
      }
      const { courses } = cache.readQuery({
        query: GET_ENROLLMENTS,
        variables: { where }
      }) || { courses: [] }

      cache.writeQuery({
        query: GET_ENROLLMENTS,
        variables: { where },
        data: { courses: [...courses, courseFromResponse] }
      })
    }
  })

  return { createEnrollment, loading }
}
