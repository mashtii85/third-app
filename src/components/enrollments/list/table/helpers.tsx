/**
 * Components - Enrollments - List - Table - Helpers
 */

// React
import { MouseEvent, useContext } from 'react'

// UI
import { Button, formatDateStandard, OffCanvasContext, TableLink } from '@drykiss/industry-ui'

// Types
import { CourseTableRowsType } from './types'
import { Enrollment } from '../../hooks/useEnrollments/types'
import { LooseObject } from '../../../../types/object'

import pages from '../../../../config/pages.json'

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
    text: 'Date',
    formatter: ({ row }: { row: CourseTableRowsType }) => {
      return formatDateStandard(row.date)
    }
  },
  {
    text: 'Status'
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
      date: item.created_at,
      status: item.status
    }
  })

  return list
}

export const Toolbar = ({ filters }: { filters: LooseObject }) => {
  console.log(filters)
  // we don't know it's type
  const offCanvas = useContext<any>(OffCanvasContext)

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    offCanvas.show({
      content: <div>form</div>,
      submit: true,
      title: 'Add An Enrollment'
    })
  }

  return <Button context="white" onClick={handleClick} size="sm" content="Create An Enrollment" />
}
