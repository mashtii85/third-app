/**
 * Components - Courses - View - Client - Tabs - Types
 */

// Types
import { Course } from '../../../../../../types/course'
import { CourseFilter } from '../../../../hooks/types'

export interface CourseResourcesToolbarType {
  filters: Partial<CourseFilter>
  defaultValues?: Course
}
