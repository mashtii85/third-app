/**
 * Components - Courses - Hooks - UseUpdateCourse - useDeleteCourse
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_COURSE } from '@availabletowork/queries'

// Types
import {
  CourseUpdateData,
  CourseUpdateVariables,
  UseHookProps,
  UseUpdateCourseOutput
} from '@availabletowork/types'

export const useUpdateCourse = (props: UseHookProps<CourseUpdateData>): UseUpdateCourseOutput => {
  const [updateCourse, { loading, error }] = useMutation<CourseUpdateData, CourseUpdateVariables>(
    UPDATE_COURSE,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updateCourse }
}
