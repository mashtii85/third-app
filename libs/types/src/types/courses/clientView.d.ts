/**
 * Components - Courses - View - Client - Tabs - Types
 */
// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Course, CourseFilter } from '.'
import { Lesson } from '../lessons'
import { Module } from '../module'

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
