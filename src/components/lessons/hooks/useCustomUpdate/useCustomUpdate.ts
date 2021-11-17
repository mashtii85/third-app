/**
 * Components - Lessons - Hooks - useCustomUpdate
 */

// Apollo
import { gql, useMutation } from '@apollo/client'

// Types
import {
  LessonUpdateData,
  LessonUpdateVariables,
  UseUpdateLessonOutput
} from '../useUpdate/types.d'
import { UseHookProps } from '../../../../types/hook.d'

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
