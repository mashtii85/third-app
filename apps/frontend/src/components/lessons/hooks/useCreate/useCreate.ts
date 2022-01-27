/**
 * Components - Lessons - Hooks - useCreate - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_LESSON, GET_LESSONS } from '../../queries/queries'

// Types
import {
  GQLClause,
  Lesson,
  LessonCreateData,
  LessonCreateVariables,
  UseCreateLessonOutput,
  UseHookProps
} from '@availabletowork/types'

export const useCreateLesson = (
  moduleId: number,
  props: UseHookProps<LessonCreateData>
): UseCreateLessonOutput => {
  const [createLesson, { error, loading }] = useMutation<LessonCreateData, LessonCreateVariables>(
    CREATE_LESSON,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables: GQLClause<Lesson> = {
          limit: 100,
          order_by: { ordering: 'asc' },
          where: { module_id: { _eq: moduleId } }
        }
        const { lessons } = cache.readQuery<{ lessons: Lesson[] }>({
          query: GET_LESSONS,
          variables
        }) || { lessons: [] }
        cache.writeQuery({
          query: GET_LESSONS,
          variables,
          data: { lessons: [...lessons, data?.lessons?.returning] }
        })
      }
    }
  )
  return { error, loading, createLesson }
}
