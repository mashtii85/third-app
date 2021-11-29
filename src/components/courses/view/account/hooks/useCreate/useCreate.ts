/**
 * Components - Courses - View - Account - Hooks - useCreateLessonProgress
 */

// Apollo
import { useMutation } from '@apollo/client'
import { ADD_LESSON_PROGRESS_ONE } from '../../../../../lessons/queries/queries'

// Types
import {
  UseCreateLessonProgressProps,
  UseCreateLessonProgressOutput,
  CreateLessonProgressVariables
} from './types'

export const useCreateLessonProgress = (
  props: UseCreateLessonProgressProps
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
