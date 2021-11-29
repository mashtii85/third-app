/**
 * Components - Courses - View - Account - Hooks - UseCreate - Types.d
 */

// Types
import { UseHookOutput, UseHookProps } from '../../../../../../types/hook.d'
import { LESSON_PROGRESS_STATUS } from '../../../../../../types/lessonProgress.d'
import { Course } from '../../../../types/course.d'

export interface CreateLessonProgressVariables {
  enrollment_id: number
  lesson_id: number
  status: LESSON_PROGRESS_STATUS
}

export interface UseCreateLessonProgressProps extends UseHookProps<CreateLessonProgressVariables> {
  // filters: Partial<CourseFilter>
}

export interface UseCreateLessonProgressOutput extends UseHookOutput {
  createLessonProgress: any
}

export interface LessonProgressQueryData {
  courses: Course[]
}
