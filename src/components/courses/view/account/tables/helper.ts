/**
 * Components - Courses - View - Account - Table - Types
 */

// Apollo
import { OperationVariables, useMutation } from '@apollo/client'

// UI
import { formatDateStandard, formatTime } from '@drykiss/industry-ui'
import {
  ADD_LESSON_PROGRESS_ONE,
  UPDATE_LESSON_PROGRESS_BY_PK
} from '../../../../lessons/queries/queries'

// Helpers
import { scrollTo } from '../../../../../utils/scrollTo'

// Types
import { COURSE_PAGE_MODE } from '../../types.d'
import { LESSON_PROGRESS_STATUS } from '../../../../../types/lessonProgress.d'
import { LessonPageStateType } from '../types.d'
import { Lesson, LESSON_TYPE } from '../../../../../types/lesson.d'
import { LessonProgressMutationType } from './types.d'

const fillCertificateModel = (
  stateHolder: LessonPageStateType,
  username: string,
  courseTitle: string,
  completedAt: string
): LessonPageStateType | undefined => {
  if (stateHolder.pageMode !== COURSE_PAGE_MODE.Finished) return
  stateHolder.certificateModel = {
    username: username,
    course: courseTitle,
    dateCompleted: completedAt,
    certificateId: 'BVM QX4 CV6'
  }
  return stateHolder
  // TODO setStateHolder(pageState)
}

export const PrepareLessonForStarting = (
  stateHolder: LessonPageStateType,
  username: string,
  courseTitle: string,
  courseId: number,
  lesson: Lesson,
  refetch: (variables?: Partial<OperationVariables> | undefined) => {}
): Lesson | undefined => {
  const [addLessonProgress] = useMutation(ADD_LESSON_PROGRESS_ONE, {
    onCompleted: () => {
      refetch()
    }
  })

  const [updateLessonProgressByPk] = useMutation(UPDATE_LESSON_PROGRESS_BY_PK, {
    onCompleted: (data) => {
      const progress = data.update_lesson_progress_by_pk
      fillCertificateModel(
        stateHolder,
        username,
        courseTitle,
        `${formatDateStandard(progress.updated_at)} ${formatTime(progress.updated_at)}`
      )
      refetch()
    }
  })

  const lessonProgress = lesson?.lesson_progresses[0] ?? null
  if (lessonProgress) {
    const lessonProgressModel: Partial<LessonProgressMutationType> = {
      status: LESSON_PROGRESS_STATUS.Started
    }
    updateLessonProgressByPk({
      variables: { id: lessonProgress.id, changes: lessonProgressModel }
    })
  } else {
    const argument: Partial<LessonProgressMutationType> = {
      enrollment_id: courseId,
      lesson_id: lesson?.id,
      status: LESSON_PROGRESS_STATUS.Started
    }
    addLessonProgress({ variables: argument })
  }
  return lesson
}

export const startLesson = (
  courseId: number,
  courseTitle: string,
  username: string,
  lesson: Lesson,
  stateHolder: LessonPageStateType,
  refetch: (variables?: Partial<OperationVariables> | undefined) => {}
): Lesson | undefined => {
  const lessonProgress = lesson?.lesson_progresses[0]
  if (lessonProgress) {
    stateHolder.selectedModuleId = lessonProgress?.lesson?.module?.id ?? 0
    stateHolder.selectedLessonId = lessonProgress?.lesson?.id ?? 0
  }

  if (lessonProgress && lessonProgress.status === LESSON_PROGRESS_STATUS.Completed) {
    stateHolder.pageMode = COURSE_PAGE_MODE.View
    stateHolder.actionButtonCaption = 'Next lesson'
    stateHolder.canCompleteLesson = false
    stateHolder.showNextLesson = true

    scrollTo('top')
    return lesson
    // TODO setLesson(lesson)
  } else {
    stateHolder.pageMode = COURSE_PAGE_MODE.Progress
    if (lesson?.type !== LESSON_TYPE.Quiz) {
      stateHolder.actionButtonCaption = 'Complete and continue'
      stateHolder.canCompleteLesson = true
      stateHolder.showNextLesson = false
    }
    scrollTo('top')
    return PrepareLessonForStarting(stateHolder, username, courseTitle, courseId, lesson, refetch)
    // TODO setLesson(prepareLessonForStarting(course, lesson) ?? null)
  }
}
