/**
 * Components - Courses - View - types.d
 */

import { CourseData } from '../hooks/types'

export enum CLIENT_TAB {
  Details = 'Details',
  Curriculum = 'Curriculum',
  Enrollments = 'Enrollments'
}

export enum COURSE_PAGE_MODE {
  View = 'View',
  Progress = 'Progress',
  Finished = 'Finished'
}

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
