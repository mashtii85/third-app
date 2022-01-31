/**
 * Components - Lessons - Hooks - useUpdate - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { SWAP_LESSONS } from '@availabletowork/queries'

// Types
import {
  LessonUpdateData,
  SwapLessonsProps,
  UseHookProps,
  UseUpdateLessonOutput
} from '@availabletowork/types'

export const useSwapLesson = (props: UseHookProps<LessonUpdateData>): UseUpdateLessonOutput => {
  const [updateLesson, { loading, error }] = useMutation<LessonUpdateData, SwapLessonsProps>(
    SWAP_LESSONS,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updateLesson }
}
