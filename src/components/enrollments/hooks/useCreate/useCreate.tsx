/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { LooseObject } from '../../../../types/object'
import { GET_ENROLLMENTS, INSERT_ENROLLMENT } from '../../queries'

// import { prepareArguments } from './helpers'

// Types
import { UseCreateEnrollmentProps } from './types'

export const useCreateEnrollment = (props: UseCreateEnrollmentProps) => {
  const [createEnrollment, { loading }] = useMutation(INSERT_ENROLLMENT, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const courseFromResponse = data?.course
      // const where = prepareArguments({ filters: props.filters, clientId: props.userId })
      const where: LooseObject = {}
      where.client_id = { _eq: props.userId }
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
