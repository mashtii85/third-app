/**
 * Components - Lessons - Hooks - useDelete - useDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_LESSON_BY_PK, GET_LESSONS } from '../../queries/queries'

// Types
import { LessonDeleteData, LessonDeleteVariables, UseDeleteLessonOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'
import { Lesson } from '../../../../types/lesson.d'
import { LooseObject } from '../../../../types/object.d'

export const useDeleteLesson = (
  moduleId: number,
  props: UseHookProps<LessonDeleteData>
): UseDeleteLessonOutput => {
  const [deleteLesson, { loading, error }] = useMutation<LessonDeleteData, LessonDeleteVariables>(
    DELETE_LESSON_BY_PK,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables: LooseObject = {
          where: { module_id: { _eq: moduleId } }
        }
        const { lessons } = cache.readQuery<{ lessons: Lesson[] }>({
          query: GET_LESSONS,
          variables
        }) || { lessons: [] }
        const lessonList = lessons.filter((lesson) => lesson.id !== data?.delete_lesson_by_pk.id)
        cache.writeQuery({
          query: GET_LESSONS,
          variables,
          data: { lessons: lessonList }
        })
      }
    }
  )
  return { error, loading, deleteLesson }
}
