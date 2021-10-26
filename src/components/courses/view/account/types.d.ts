/**
 * Components - Courses - View - Account - Table - Types
 */

// Types
import { LessonCertificateType } from './components/certificate/types'
import { COURSE_PAGE_MODE } from '../types.d'

export interface LessonPageStateType {
  pageMode: COURSE_PAGE_MODE
  actionButtonCaption: string
  canCompleteLesson: boolean
  showNextLesson: boolean
  completedLessonId: number
  selectedModuleId: number
  selectedLessonId: number
  certificateModel: LessonCertificateType
}
