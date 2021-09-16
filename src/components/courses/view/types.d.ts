/**
 * Components - Courses - View - types.d
 */

export enum CLIENT_TAB {
  Details = 'details',
  Lessons = 'lessons',
  Enrollments = 'enrollments'
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
