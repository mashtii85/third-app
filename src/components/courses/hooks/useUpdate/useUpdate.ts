/**
 * Components - Courses - List - Table - Hooks - useDeleteCourse - useDeleteCourse
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_COURSE } from '../../queries'

// Types
import { CourseUpdateData, CourseUpdateVariables, UseUpdateCourseOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'

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
