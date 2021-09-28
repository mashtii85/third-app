/**
 * Components - Enrollments - List - Table - Helpers
 */

// UI
import { formatDateStandard, TableLink } from '@drykiss/industry-ui'

// Types
import { CourseTableRowsType } from './types'
import { Enrollment } from '../../hooks/useEnrollments/types'

import pages from '../../../../config/pages'

export const columns = () => [
  {
    text: 'id',
    hidden: true
  },
  {
    text: 'Course',
    formatter: TableLink(pages.dashboard.coursesClient.view_by_id, 'id', 'course')
  },
  {
    text: 'User'
  },
  {
    text: 'Author'
  },
  {
    text: 'Completed Lessons'
  },
  {
    text: 'Status'
  },
  {
    text: 'Date',
    formatter: ({ row }: { row: CourseTableRowsType }) => {
      return formatDateStandard(row.date)
    }
  }
]

export const rows = (courses: Enrollment[]): CourseTableRowsType[] => {
  const list: CourseTableRowsType[] = courses.map((item) => {
    return {
      id: item.id,
      course: item.course.title,
      user: `${item.user.name_first} ${item.user.name_last}`,
      author: item.course?.custom_fields?.author || '-',
      completedLessons: item.completed_lessons.aggregate.count,
      status: item.status,
      date: item.created_at
    }
  })

  return list
}
