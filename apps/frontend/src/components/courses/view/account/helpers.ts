/**
 * Components - Courses - View - Account - Helpers
 */

// UI
import { formatDateStandard, formatTime } from '@drykiss/industry-ui'

// Helpers
import { startLesson } from './handler'

// Types
import { Course } from '../../../../types/course.d'
import { Lesson, LESSON_TYPE } from '../../../../types/lesson.d'
import {
  LessonProgress,
  LessonProgressUpdateModel,
  LESSON_PROGRESS_STATUS
} from '../../../../types/lessonProgress.d'
import { Module } from '../../../../types/module.d'
import { COURSE_PAGE_MODE } from '../types.d'
import { CourseActionTypes, CourseState } from './types.d'
import {
  findNextLesson,
  getCurrentLesson,
  getCurrentLessonProgress
} from '../../../lessons/helpers'
import { COURSE_ENROLLMENT_STATUS } from '../../../../types/courseEnrollment.d'

export const preparePageState: CourseState = {
  pageMode: COURSE_PAGE_MODE.Progress,
  hasActiveLesson: false,
  actionButtonCaption: 'Complete and continue',
  canCompleteLesson: false,
  showNextLesson: false,
  completedLessonId: 0,
  selectedModuleId: 0,
  selectedLessonId: 0,
  certificateModel: {
    username: '',
    courseTitle: '',
    dateCompleted: '',
    certificateId: ''
  }
}

export const lessonSummary = (course: Course): LessonProgress[] => {
  const progress: LessonProgress[] = []
  const modules = course.modules || []

  modules.forEach((module: Module) => {
    const lessons: Lesson[] = module.lessons || []
    lessons.forEach((lesson: Lesson) => {
      const lessonProgress: LessonProgress = lesson?.lesson_progresses[0]
      if (lessonProgress) {
        progress.push(lessonProgress)
      } else {
        const lessonProgressModel: LessonProgress = {
          label: LESSON_PROGRESS_STATUS.Pending,
          status: LESSON_PROGRESS_STATUS.Pending,
          id: 0,
          updated_at: new Date()
        }
        progress.push(lessonProgressModel)
      }
    })
  })
  return progress
}

export const fillCertificateModel = (
  pageMode: COURSE_PAGE_MODE,
  username: string,
  courseTitle: string,
  dateCompleted: string,
  certificateId: string,
  onStateChanged: (action: CourseActionTypes) => void
): void => {
  if (pageMode !== COURSE_PAGE_MODE.Finished) return
  onStateChanged({
    type: 'certificate',
    payload: {
      username,
      courseTitle,
      dateCompleted,
      certificateId
    }
  })
}

export const completeLesson = (
  state: CourseState,
  course: Course,
  onStateChanged: (action: CourseActionTypes) => void
): void => {
  const lessonProgress = getCurrentLessonProgress(
    course,
    state.currentLesson?.module_id,
    state.currentLesson?.id
  )
  const nextLesson = findNextLesson(course, state.currentLesson?.module_id, state.currentLesson?.id)
  if (!nextLesson) {
    state.pageMode = COURSE_PAGE_MODE.Finished
  }

  if (
    lessonProgress?.status === LESSON_PROGRESS_STATUS.Completed &&
    state.pageMode !== COURSE_PAGE_MODE.Finished &&
    state.currentLesson?.type !== LESSON_TYPE.Quiz
  ) {
    state.pageMode = COURSE_PAGE_MODE.View
    if (nextLesson) {
      state.selectedModuleId = nextLesson.selectedModuleId
      state.selectedLessonId = nextLesson.selectedLessonId
    }

    const currentLesson = getCurrentLesson(course, state.selectedModuleId, state.selectedLessonId)
    if (currentLesson) {
      startLesson(currentLesson, onStateChanged)
    }
  } else {
    if (state.pageMode !== COURSE_PAGE_MODE.Finished) {
      state.pageMode = COURSE_PAGE_MODE.Progress
      state.canCompleteLesson = false
      state.showNextLesson = false
      state.completedLessonId = state.selectedLessonId
    }

    if (
      lessonProgress?.status === LESSON_PROGRESS_STATUS.Completed &&
      state.currentLesson?.type !== LESSON_TYPE.Quiz
    ) {
      fillCertificateModel(
        state.pageMode,
        'user.name_first user.name_last',
        'course.title',
        `${formatDateStandard(lessonProgress.updated_at)} ${formatTime(lessonProgress.updated_at)}`,
        'BVM QX4 CV6',
        onStateChanged
      )
    } else {
      let lessonProgressModel: LessonProgressUpdateModel = {
        points: 1,
        status: LESSON_PROGRESS_STATUS.Completed
      }
      if (state.currentLesson?.type === LESSON_TYPE.Quiz) {
        const passed = state.quizState?.finalScore >= state.quizState?.minimumScore
        lessonProgressModel = {
          ...lessonProgressModel,
          meta: {
            ...lessonProgress?.meta,
            quizScore: state.quizState?.finalScore,
            quizPassed: passed
          },
          status: passed ? LESSON_PROGRESS_STATUS.Completed : LESSON_PROGRESS_STATUS.Started
        }
        state.quizState = { finalScore: 0, minimumScore: 0, passed: false }
        state.canCompleteLesson = true
      }

      onStateChanged({
        type: 'updateProgress',
        payload: { id: lessonProgress?.id, changes: lessonProgressModel }
      })

      if (state.pageMode === COURSE_PAGE_MODE.Finished) {
        const courseEnrollmentModel = { status: COURSE_ENROLLMENT_STATUS.Completed }

        if (course?.course_enrollments)
          onStateChanged({
            type: 'updateEnrollment',
            payload: { id: course?.course_enrollments[0]?.id, changes: courseEnrollmentModel }
          })
      }
    }

    if (nextLesson) {
      const tmp = getCurrentLesson(course, nextLesson.selectedModuleId, nextLesson.selectedLessonId)
      tmp && startLesson(tmp, onStateChanged)
    }
  }
}
