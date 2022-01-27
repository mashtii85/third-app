/**
 * Components - Courses - View - Account - Hooks - UseUpdate - UseUpdateLessonProgress
 */

// Apollo
import { useMutation } from '@apollo/client'

// Types
import {
  LessonProgressUpdateData,
  LessonProgressUpdateVariables,
  UseUpdateLessonProgressOutput,
  UseHookProps
} from '@availabletowork/types'
import { UPDATE_LESSON_PROGRESS_BY_PK } from '../../../../../lessons/queries/queries'

export const useUpdateLessonProgress = (
  props: UseHookProps<LessonProgressUpdateData>
): UseUpdateLessonProgressOutput => {
  const [updateLessonProgress, { loading, error }] = useMutation<
    LessonProgressUpdateData,
    LessonProgressUpdateVariables
  >(UPDATE_LESSON_PROGRESS_BY_PK, {
    onCompleted: props.onCompleted,
    onError: props.onError
  })
  return { error, loading, updateLessonProgress }
}
