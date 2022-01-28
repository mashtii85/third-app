/**
 * Components - Courses - View - Account - Table - Types
 */

// Constants
import {
  COURSE_ENROLLMENT_STATUS,
  COURSE_PAGE_MODE,
  LESSON_PROGRESS_STATUS
} from '@availabletowork/constants'

// Types
import { Lesson, LessonProgressUpdateModel } from '../lessons'
import { LessonCertificateType } from './certificate'

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

export interface CoursePageSetting {
  pageMode: COURSE_PAGE_MODE
  hasActiveLesson: boolean
  selectedModuleId: number
  selectedLessonId: number
  actionButtonCaption: string
  canCompleteLesson: boolean
  showNextLesson: boolean
  completedLessonId: number
}

export interface AccountQuizState {
  finalScore: number
  minimumScore: number
  passed: boolean
}

export interface UpdateLessonProgressAction {
  id: number
  changes: Partial<LessonProgressUpdateModel>
}

export interface CreateLessonProgressAction {
  enrollment_id: number
  lesson_id: number
  status: LESSON_PROGRESS_STATUS
}

export interface UpdateCourseEnrollmentAction {
  id: number
  changes: { status: COURSE_ENROLLMENT_STATUS }
}

export interface CourseCertificate {
  username: string
  courseTitle: string
  dateCompleted: string
  certificateId: string
}

export interface CourseState extends CoursePageSetting {
  currentLesson?: Lesson
  quizState?: AccountQuizState
  certificateModel: Partial<CourseCertificate>
}

type SetPageMode = { type: 'pageMode'; payload: COURSE_PAGE_MODE }
type SetActiveLesson = { type: 'activeLesson'; payload: boolean }
type SetSelectedIds = {
  type: 'selectedIds'
  payload: { selectedModuleId: number; selectedLessonId: number }
}
type ChangeSettings = { type: 'changeSettings'; payload: Partial<CoursePageSetting> }
type SetCaption = { type: 'buttonCaption'; payload: string }
type SetCompletePermission = { type: 'canComplete'; payload: boolean }
type SetNextLessonPermission = { type: 'nextLesson'; payload: boolean }
type SetCompletedLessonId = { type: 'completedId'; payload: number }
type SetLesson = { type: 'setLesson'; payload?: Lesson }
type PrepareLesson = { type: 'prepareLesson'; payload?: Lesson }
type QuizFinished = { type: 'quizFinished'; payload: AccountQuizState }
type UpdateLessonProgress = { type: 'updateProgress'; payload: UpdateLessonProgressAction }
type CreateLessonProgress = { type: 'createProgress'; payload: CreateLessonProgressAction }
type UpdateCourseEnrollment = { type: 'updateEnrollment'; payload: UpdateCourseEnrollmentAction }
type Certificate = { type: 'certificate'; payload: CourseCertificate }

export type CourseActionTypes =
  | SetPageMode
  | SetActiveLesson
  | SetSelectedIds
  | ChangeSettings
  | SetCaption
  | SetCompletePermission
  | SetNextLessonPermission
  | SetCompletedLessonId
  | SetLesson
  | PrepareLesson
  | QuizFinished
  | UpdateLessonProgress
  | CreateLessonProgress
  | UpdateCourseEnrollment
  | Certificate
