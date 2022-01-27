/**
 * Components - Lessons - Hooks - useUpdate - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_LESSON_BY_PK } from '../../queries/queries'

// Types
import {
  LessonUpdateData,
  LessonUpdateVariables,
  UseHookProps,
  UseUpdateLessonOutput
} from '@availabletowork/types'

export const useUpdateLesson = (props: UseHookProps<LessonUpdateData>): UseUpdateLessonOutput => {
  const [updateLesson, { loading, error }] = useMutation<LessonUpdateData, LessonUpdateVariables>(
    UPDATE_LESSON_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError
    }
  )
  return { error, loading, updateLesson }
}
