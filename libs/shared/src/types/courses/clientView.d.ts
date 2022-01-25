/**
 * Components - Courses - View - Client - Tabs - Types
 */

// Types
// import { CourseFilter } from '../../../hooks'
// import { Course } from '../../../../../types/course.d'
// import { Lesson } from '../../../../../../types/lesson.d'
// import { Module } from '../../../../../../types/module.d'
// import { STATUS_ACTIVE } from '../../../../../../types/select.d'

export interface CourseToolbarType {
  filters: Partial<CourseFilter>
  defaultValues?: Course
}
interface ModuleToolbarType {
  id?: number
  courseId: number
  title: string
  description?: string
  ordering?: number
  status: STATUS_ACTIVE
  modules: Module[]
  lessons?: Lesson[]
  onChanged: () => void
}
export interface CourseResourcesToolbarType {
  filters: Partial<CourseFilter>
  defaultValues?: Course
}
