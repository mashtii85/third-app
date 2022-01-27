/**
 * Components - Lessons - Hooks - useCustomUpdate
 */

// Apollo
import { gql, useMutation } from '@apollo/client'

// Types
import {
  LessonUpdateData,
  LessonUpdateVariables,
  UseHookProps,
  UseUpdateLessonOutput
} from '@availabletowork/types'

export const useCustomUpdateLesson = (
  customQuery: string,
  { onCompleted, onError }: UseHookProps<LessonUpdateData>
): UseUpdateLessonOutput => {
  const [updateLesson, { loading, error }] = useMutation<LessonUpdateData, LessonUpdateVariables>(
    gql`
      ${customQuery}
    `,
    {
      onCompleted,
      onError
    }
  )
  return { error, loading, updateLesson }
}
