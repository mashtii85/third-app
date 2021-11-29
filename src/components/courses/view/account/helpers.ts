import { Course } from '../../../../types/course'
import { Lesson } from '../../../../types/lesson'
import { LessonProgress, LESSON_PROGRESS_STATUS } from '../../../../types/lessonProgress.d'
import { Module } from '../../../../types/module'
import { COURSE_PAGE_MODE } from '../types.d'
import { AssignmentActionTypes } from './components/assignment/types'

export const preparePageState = {
  pageMode: COURSE_PAGE_MODE.Progress,
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

export const onAssignmentStateChanged = ({
  action,
  refetch,
  completeLesson
}: {
  action: AssignmentActionTypes
  refetch: () => void
  completeLesson: () => void
}): any => {
  switch (action.type) {
    case 'finish':
      completeLesson()
      break
    case 'reset':
    case 'upload':
    default:
      refetch()
      break
  }
  // const progress = getCurrentLessonProgress(
  //   course,
  //   stateHolder.selectedModuleId,
  //   stateHolder.selectedLessonId
  // )
  // if (progress?.status === LESSON_PROGRESS_STATUS.Completed) {
  //   const lessonProgressModel = { status: LESSON_PROGRESS_STATUS.Pending }
  //   updateLessonProgressByPk({
  //     variables: { id: progress.id, changes: lessonProgressModel }
  //   })
  // }
}
