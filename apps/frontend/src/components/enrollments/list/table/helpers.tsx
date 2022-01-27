/**
 * Components - Enrollments - List - Table - Helpers
 */

// UI
import { formatDateStandard, TableLink } from '@drykiss/industry-ui'

// Types
import { Column, CourseEnrollmentsTableRowsType, Enrollment, pages } from '@availabletowork/types'

export const columns = () => {
  const columnsSchema: Column<CourseEnrollmentsTableRowsType>[] = [
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
      formatter: ({ row }: { row: CourseEnrollmentsTableRowsType }) => {
        return formatDateStandard(row.date)
      }
    }
  ]
  return columnsSchema
}

export const rows = (courses: Enrollment[]): CourseEnrollmentsTableRowsType[] => {
  const list: CourseEnrollmentsTableRowsType[] = courses.map((item) => {
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
