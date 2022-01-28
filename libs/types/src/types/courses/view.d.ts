/**
 * Components - Courses - View - types.d
 */

import { CourseData } from '.'
import { COURSE_PAGE_MODE } from '@availabletowork/constants'

export interface CompletionCertificateStyledComponent {
  username: string
  course: string
  dateCompleted: string
  certificateId: string
}
export interface CourseViewPageState {
  pageMode: COURSE_PAGE_MODE
  actionButtonCaption: string
  canCompleteLesson: boolean
  showNextLesson: boolean
  completedLessonId: number
  selectedModuleId: number
  selectedLessonId: number
  certificateModel: {
    username: string
    course: string
    dateCompleted: string
    certificateId: string
  }
}

type StartLessonAction = {
  type: 'startLesson'
  data: CourseData
}

export type CoursePageActions = StartLessonAction
