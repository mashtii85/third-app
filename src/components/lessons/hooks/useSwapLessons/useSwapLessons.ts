/**
 * Components - Lessons - Hooks - useUpdate - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { SWAP_LESSONS } from '../../queries/queries'

// Types
import { LessonUpdateData, SwapLessonsProps, UseUpdateLessonOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'

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
