/**
 * Components - Courses - Types
 */

import { Course } from '../../types/course'

export interface CourseListProps {
  courses: Course[]
}

export interface CourseDB extends Course {
  account_id?: number
}
