/**
 * Components - Enrollments - Hooks - UseUpdate - updateCourseEnrollment
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_COURSE_ENROLLMENT_BY_PK } from '../../queries'

// Types
import {
  CourseEnrollmentUpdateData,
  CourseEnrollmentUpdateVariables,
  UseUpdateCourseEnrollmentOutput,
  UseHookProps
} from '@availabletowork/types'

export const useUpdateCourseEnrollment = (
  props: UseHookProps<CourseEnrollmentUpdateData>
): UseUpdateCourseEnrollmentOutput => {
  const [updateCourseEnrollment, { loading, error }] = useMutation<
    CourseEnrollmentUpdateData,
    CourseEnrollmentUpdateVariables
  >(UPDATE_COURSE_ENROLLMENT_BY_PK, {
    onCompleted: props.onCompleted,
    onError: props.onError
  })
  return { error, loading, updateCourseEnrollment }
}
