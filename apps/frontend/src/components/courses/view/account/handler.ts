/**
 * Components - Courses - View - Account - Helpers
 */

// UI
import { formatDateStandard, formatTime } from '@drykiss/industry-ui'

// Helpers
import { scrollTo } from '../../../../utils/scrollTo'

// Constants
import { THEME_CONTEXT } from '@availabletowork/types'

//Types
import {
  CourseActionTypes,
  COURSE_PAGE_MODE,
  CourseState,
  Lesson,
  LESSON_PROGRESS_STATUS,
  LESSON_TYPE,
  Module,
  StepperActionModel,
  StepperModel
} from '@availabletowork/types'

const stepperItemInfo = (
  lessonType: LESSON_TYPE,
  canComplete: boolean,
  isActive: boolean,
  progressStatus?: LESSON_PROGRESS_STATUS
): string | undefined => {
  if (
    (lessonType === LESSON_TYPE.Assignment || lessonType === LESSON_TYPE.Quiz) &&
    progressStatus === LESSON_PROGRESS_STATUS.Completed
  )
    return undefined
  if (
    progressStatus === LESSON_PROGRESS_STATUS.Started &&
    !isActive &&
    (lessonType === LESSON_TYPE.Assignment || lessonType === LESSON_TYPE.Quiz || canComplete)
  )
    return 'In progress ...'
  return undefined
}

export const prepareLessons = (
  state: CourseState,
  module: Module,
  onStateChange: (action: CourseActionTypes) => void
): StepperModel[] => {
  const data: StepperModel[] = []
  let actionId = 0
  let isActive = false

  module?.lessons?.length &&
    module.lessons.forEach((lesson: Lesson) => {
      const progress = lesson.lesson_progresses[0]
      if (!state.hasActiveLesson && progress?.status !== LESSON_PROGRESS_STATUS.Completed) {
        state.hasActiveLesson = true
        isActive = true
        if (state.pageMode === COURSE_PAGE_MODE.Progress) {
          state.selectedModuleId = module.id
          state.selectedLessonId = lesson.id
        }
      } else isActive = false

      actionId++
      const current =
        progress?.status === undefined || progress?.status === LESSON_PROGRESS_STATUS.Pending

      const actionModel: StepperActionModel = {
        id: actionId,
        active:
          (isActive && !state.canCompleteLesson) ||
          progress?.status === LESSON_PROGRESS_STATUS.Completed,
        context: THEME_CONTEXT.primary,
        type: 'button',
        content: current ? 'Start lesson' : 'Continue lesson',
        handleClick: () => startLesson(lesson, onStateChange)
      }

      if (progress?.status === LESSON_PROGRESS_STATUS.Completed) {
        actionModel.context = THEME_CONTEXT.danger
        actionModel.content = 'View lesson'
      }

      const item = {
        id: lesson.id,
        label: lesson.title,
        info: stepperItemInfo(lesson.type, state.canCompleteLesson, isActive, progress?.status),
        highlighted: progress?.status === LESSON_PROGRESS_STATUS.Started,
        labelIcon:
          lesson.type === LESSON_TYPE.Quiz || lesson.type === LESSON_TYPE.Video
            ? lesson.type
            : undefined,
        date:
          progress?.status === LESSON_PROGRESS_STATUS.Completed
            ? `${formatDateStandard(progress.updated_at)} ${formatTime(progress.updated_at)}`
            : null,
        status: progress?.status,
        actions: [actionModel]
      }
      data.push(item)
    })
  return data
}

export const prepareLessonForStarting = (
  lesson: Lesson,
  onStateChanged: (action: CourseActionTypes) => void
): Lesson | undefined => {
  const lessonProgress = lesson?.lesson_progresses[0] ?? null
  if (lessonProgress) {
    const lessonProgressModel = { status: LESSON_PROGRESS_STATUS.Started }
    onStateChanged({
      type: 'updateProgress',
      payload: { id: lessonProgress?.id, changes: lessonProgressModel }
    })
  } else {
    const createProps = {
      enrollment_id: lesson.course_id,
      lesson_id: lesson?.id,
      status: LESSON_PROGRESS_STATUS.Started
    }
    onStateChanged({
      type: 'createProgress',
      payload: createProps
    })
  }
  return lesson
}

export const startLesson = (
  lesson: Lesson,
  onStateChange: (action: CourseActionTypes) => void
): void => {
  const lessonProgress = lesson?.lesson_progresses[0]
  if (lessonProgress) {
    onStateChange({
      type: 'selectedIds',
      payload: { selectedModuleId: lesson.module_id, selectedLessonId: lesson.id }
    })
  }

  if (lessonProgress && lessonProgress.status === LESSON_PROGRESS_STATUS.Completed) {
    onStateChange({
      type: 'changeSettings',
      payload: {
        pageMode: COURSE_PAGE_MODE.View,
        actionButtonCaption: 'Next lesson',
        showNextLesson: true,
        canCompleteLesson: false
      }
    })
    onStateChange({ type: 'setLesson', payload: lesson })
  } else {
    onStateChange({ type: 'pageMode', payload: COURSE_PAGE_MODE.Progress })
    if (lesson.type !== LESSON_TYPE.Assignment && lesson.type !== LESSON_TYPE.Quiz) {
      onStateChange({ type: 'canComplete', payload: true })
    }
    if (lesson?.type !== LESSON_TYPE.Quiz) {
      onStateChange({
        type: 'changeSettings',
        payload: {
          actionButtonCaption: 'Complete and continue',
          showNextLesson: false
        }
      })
    }
    onStateChange({ type: 'prepareLesson', payload: lesson })
  }

  scrollTo('top')
}
