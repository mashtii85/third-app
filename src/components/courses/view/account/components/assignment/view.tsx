/**
 * Components - Cources - View - Account - Components - Assignment
 */

// React
import { useReducer } from 'react'

// UI
import { Space } from '@drykiss/industry-ui'

// Helpers
import { Buttons } from './helpers'

// Types
import { Lesson } from '../../../../../../types/lesson.d'
import { LessonProgress, LESSON_PROGRESS_STATUS } from '../../../../../../types/lessonProgress.d'
import { AssignmentActionTypes, AssignmentState } from './types.d'
import { MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../../../types/medium.d'
import { Taxonomy } from '../../../../../../types/taxonomy.d'
import { CurrentUser } from '../../../../../../types/user.d'
import { reducer } from './reducer'

export const CourseLessonAssignment = ({
  lesson,
  user,
  onStateChanged
}: {
  lesson: Lesson
  user: CurrentUser
  onStateChanged: (action: AssignmentActionTypes) => void
}) => {
  const taxonomy: Partial<Taxonomy> =
    lesson.taxonomies && lesson.taxonomies.length > 0 ? lesson.taxonomies[0] : {}

  const acceptableTypes: MEDIUM_TYPE[] = taxonomy?.meta ? taxonomy.meta.answer_types : []

  const uploadedFile = taxonomy?.media?.find(
    (medium) => medium.client_id === user.client_id && medium.category === MEDIUM_CATEGORY.Lesson
  )

  const progress: Partial<LessonProgress> =
    lesson.lesson_progresses && lesson.lesson_progresses.length > 0
      ? lesson.lesson_progresses[0]
      : {
        status: LESSON_PROGRESS_STATUS.Started,
        meta: { quizScore: 0, quizPassed: false }
      }

  const stateModel: AssignmentState = {
    acceptableTypes: acceptableTypes,
    fileCaption: uploadedFile?.caption!,
    isFinished: progress.status === LESSON_PROGRESS_STATUS.Completed
  }
  const [state, dispatch] = useReducer(reducer, stateModel)

  const handleStateChanged = (action: AssignmentActionTypes) => {
    dispatch(action)
    onStateChanged(action)
  }

  return (
    <>
      {lesson.content ?? 'No Assignment'}
      <Space />
      <Buttons
        key="buttons"
        clientId={user.client_id}
        taxonomyId={taxonomy.id!}
        lessonId={lesson.id!}
        state={state}
        onStateChanged={handleStateChanged}
      />
    </>
  )
}
