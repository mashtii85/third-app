/**
 * Components - Courses - View - Account - Hooks - useCreateLessonProgress
 */

// Apollo
import { useMutation } from '@apollo/client'
import { ADD_LESSON_PROGRESS_ONE } from '../../../../../lessons/queries/queries'

// Types
import {
  CreateLessonProgressVariables,
  UseCreateLessonProgressOutput,
  UseHookProps
} from '@availabletowork/types'

export const useCreateLessonProgress = (
  props: UseHookProps<CreateLessonProgressVariables>
): UseCreateLessonProgressOutput => {
  const [createLessonProgress, { error, loading }] = useMutation<CreateLessonProgressVariables>(
    ADD_LESSON_PROGRESS_ONE,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )

  return { createLessonProgress, error, loading }
}
