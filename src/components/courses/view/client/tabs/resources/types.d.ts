/**
 * Components - Courses - View - Client - Tabs - Types
 */

// Types
import { CourseFilter } from '../../../hooks/types.d'
import { Course } from '../../../../../types/course.d'

export interface CourseResourcesToolbarType {
  filters: Partial<CourseFilter>
  defaultValues?: Course
}
